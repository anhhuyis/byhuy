import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PopupThuChiComponent } from '../popup-thu-chi/popup-thu-chi.component';
import { PopupHistoryComponent } from '../popup-history/popup-history.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Dropdown } from 'bootstrap';

@Component({
  selector: 'app-display',
  imports: [CommonModule, HomeComponent, TranslateModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent {
  personalData: any[] = [];
  searchResul: any[] = [];
  usd: number = HomeComponent.usd;
  @Input() lang: string = 'vi';
  constructor(private router: Router, private modalService: NgbModal, /*private translate : TranslateService*/) {
    // this.translate.addLangs(['vi', 'en']);
    // this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      this.router.navigate(['/login']); // Điều hướng về trang đăng nhập nếu chưa đăng nhập
    } else {
      this.loadData();
    }
    // Lấy ngôn ngữ đã lưu trong localStorage
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.lang = savedLang;
    }
  }

  onLanguageChange(newLang: string) {
    this.lang = newLang;
    localStorage.setItem('lang', newLang); // Lưu vào localStorage
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      this.router.navigate(['/login']); // Quay lại trang đăng nhập nếu chưa đăng nhập
    }
  }
  // Load dữ liệu từ localStorage
  loadData() {
    const data = localStorage.getItem('personalData');
    this.personalData = data ? JSON.parse(data) : [];
    this.searchResul = this.personalData;
  }

  // Xóa một item theo ID
  // deleteData(id: number) {
  //   if (confirm('Bạn có chắc chắn muốn xóa người này không?')) {
  //     this.personalData = this.personalData.filter(
  //       (person) => person.id !== id
  //     );
  //     localStorage.setItem('personalData', JSON.stringify(this.personalData));

  //     this.searchResul = this.personalData;
  //   }
  // }
  // goToEditComponent(id: number) {
  //   this.router.navigate(['/edit', id]);
  // }
  PopupthuChi(person: any) {
    const modalRef = this.modalService.open(PopupThuChiComponent);
    modalRef.componentInstance.person = person; // Pass the person data to the popup
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData(); // tải lại dữ liệu sau giao dịch thành công
      }
    });
  }
  PopupHistory(id: number) {
    const modalRef = this.modalService.open(PopupHistoryComponent, {
      size: 'lg',
      windowClass: 'custom-modal-width'
    });
    modalRef.componentInstance.person = id;
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    });
  }
  removeVietnameseAccents(str: string) {
    return str
      .normalize('NFD') // Chuẩn hóa Unicode
      .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
      .replace(/đ/g, 'd') // Thay thế đ -> d
      .replace(/Đ/g, 'D'); // Thay thế Đ -> D
  }

  TimKiem(ten: string) {
    if (ten.trim()) {
      this.searchResul = this.personalData.filter((person: any) =>
        this.removeVietnameseAccents(person.fullname)
          .toLowerCase()
          .includes(this.removeVietnameseAccents(ten).toLowerCase())
      );
    } else {
      this.searchResul = this.personalData; // Nếu không có từ khóa tìm kiếm, hiển thị toàn bộ dữ liệu
    }
  }
}

