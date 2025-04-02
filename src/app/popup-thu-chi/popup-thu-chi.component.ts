import { Component, Input, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { Fluid } from 'primeng/fluid';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from '../home/home.component';
import { transaction } from '../../../model/person.model';

@Component({
  selector: 'app-popup-thu-chi',
  templateUrl: './popup-thu-chi.component.html',
  imports: [FormsModule, CommonModule, InputNumberModule, Fluid, TranslateModule],
  styleUrls: ['./popup-thu-chi.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'vi' }]
})
export class PopupThuChiComponent implements OnInit {
  @Input() person: any;
  transactionHistory: { [userId: string]: any[] } = {};
  amount: number | null = null;
  formattedAmount: string = '';
  reason: string = '';
  transactionType: string = 'thu';
  lang: string = 'vi';
  usd: number = HomeComponent.usd;
  isSubmitted = false;

  constructor(public activeModal: NgbActiveModal, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.lang = savedLang;
    }
  }

  formatNumber(value: number | null): string {
    return value ? new Intl.NumberFormat(this.locale).format(value) : '';
  }

  onSubmit() {
    this.isSubmitted = true; 
    if (this.amount === null) {
      console.log("Mời nhập số tiền");
      return;
    }
    if (this.amount < 0) {
      console.log("Số tiền phải lớn hơn 0");
      return;
    }
    if (this.reason.trim() === '') {
      console.log("Mời nhập lý do");
      return;
    }
  }

  confirmTransaction() {
    this.onSubmit();
    if (this.amount === null || this.amount <= 0 || this.reason === '') {
      return;
    }

    if(this.lang == 'en' && this.amount !== null) {
      this.amount = this.amount * 25500;
    }
    const amountValue = this.amount;
    const balanceValue = this.person.balance + (this.transactionType === 'thu' ? amountValue : -amountValue);

    const newTransaction = new transaction(
      this.person.id,
      amountValue,
      balanceValue,
      this.reason,
      new Date(),
      this.transactionType === 'thu' ? 'Thu' : 'Chi'
    );

    if (this.transactionType === 'thu') {
      this.person.balance += amountValue;
    } else if (this.transactionType === 'chi') {
      this.person.balance -= amountValue;
    }
    this.person.transactions.push(newTransaction);

    localStorage.setItem('personalData', JSON.stringify(JSON.parse(localStorage.getItem('personalData')!).map((item: any) => {
      if (item.id == this.person.id){
        return this.person;
      } else {
        return item;
      }
    })));

    if (!this.transactionHistory[this.person.id]) {
      this.transactionHistory[this.person.id] = [];
    }

    this.activeModal.close('success');
  }
}