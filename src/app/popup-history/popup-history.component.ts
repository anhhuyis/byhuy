import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-popup-history',
  templateUrl: './popup-history.component.html',
  styleUrls: ['./popup-history.component.css'],
  imports: [CommonModule, FormsModule, TranslateModule],
})
export class PopupHistoryComponent implements OnInit {
  @Input() person: any; // Dữ liệu người dùng từ component cha

  filteredHistory: any[] = []; // Mảng dữ liệu sau khi lọc
  typeresul: any[] = []; // Mảng kết quả sau khi phân loại
  fullname: string = '';
  usd: number = 25500;
  lang: string = 'vi';

  // Phân trang
  currentPage: number = 1;
  itemsPerPage: number = 10; // Số mục hiển thị trên mỗi trang

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.fullname = this.person.fullname; // Lấy tên người dùng
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.lang = savedLang;
    }
    this.loadData(); // Load dữ liệu khi khởi tạo component
  }

  // Lấy dữ liệu lịch sử giao dịch từ person.transactions
  loadData() {
    this.filteredHistory = this.person.transactions || [];
    this.typeresul = [...this.filteredHistory];
  }

  // Phân loại giao dịch theo loại (thu/chi)
  PhanLoai(transactionType: string) {
    if (transactionType === 'All') {
      this.typeresul = [...this.filteredHistory];
    } else {
      this.typeresul = this.filteredHistory.filter(
        (item) => item.type.toLowerCase() === transactionType.toLowerCase()
      );
    }
    this.currentPage = 1; // Reset trang về đầu sau khi lọc
  }

  // Truyền dữ liệu vào trang hiện tại
  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.typeresul.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Tính tổng số trang
  get totalPages(): number {
    return Math.ceil(this.typeresul.length / this.itemsPerPage);
  }

  // Chuyển trang
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
