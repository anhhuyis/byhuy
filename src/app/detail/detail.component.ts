import { CommonModule } from '@angular/common';
import { Component, HostListener, input } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PopupThuChiComponent } from '../popup-thu-chi/popup-thu-chi.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-detail',
  imports: [CommonModule, HomeComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  personalData: any[] = [];
  searchResul: any[] = [];
  constructor(private router: Router, private modalService: NgbModal) {}
  ngOnInit(): void {
      this.loadData();
  }
  // Load dữ liệu từ localStorage
  loadData() {
    const data = localStorage.getItem('personalData');
    this.personalData = data ? JSON.parse(data) : [];
    this.searchResul = this.personalData;
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
        this.removeVietnameseAccents(person.hoTen)
          .toLowerCase()
          .includes(this.removeVietnameseAccents(ten).toLowerCase())
      );
    } else {
      this.searchResul = this.personalData; // Nếu không có từ khóa tìm kiếm, hiển thị toàn bộ dữ liệu
    }
  }
  PopupthuChi(person: any) {
    const modalRef = this.modalService.open(PopupThuChiComponent);
    modalRef.componentInstance.person = person; // truyền dữ liệu person sang popup
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData(); // tải dư liệu sau khi thêm giao dịch
      }
    });
  }

}
