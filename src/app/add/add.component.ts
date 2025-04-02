import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { person } from '../../../model/person.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HomeComponent, TranslateModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent implements OnInit {
  form!: FormGroup;
  jsonArrayData: person[] = [];
  f: any;
  submitted: Boolean = false;
  constructor(private fb: FormBuilder, private router: Router) {
    //fb tạo ra các from control ,addressService lấy dữ liệu
    this.form = this.fb.group({
      // tạo 1 form group chứa một form control
      address: [''],
    });
  }

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      this.router.navigate(['/login']); // Điều hướng về trang đăng nhập nếu chưa đăng nhập
    } else {
      const data = this.getDataFromLocalStorage();
      this.jsonArrayData = data ? data : [];
      // //Check rỗng
      this.form = this.fb.group({
        fullname: ['', Validators.required],
        ngaySinh: ['', Validators.required],
        cccd: [
          '',
          [
            Validators.required,
            Validators.pattern(/\b\d{9}\b|\b\d{12}\b/),
            Validators.minLength(9),
            Validators.maxLength(12),
          ],
        ],
        gioiTinh: [''],
        diaChi: [''],
        fbWeb: [''],
        balance: 0,
      });
      this.f = this.form.controls;
    }
  }

  // Lưu dữ liệu vào localStorage
  saveDataToLocalStrorage(data: any): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem('personalData', jsonData);
  }
  //Lấy dữ liệu từ localStorage

  getDataFromLocalStorage(): person[] {
    const jsonData = localStorage.getItem('personalData');
    if (jsonData) {
      const parsedData = JSON.parse(jsonData);
      if (Array.isArray(parsedData)) {
        return parsedData;
      }
    }
    return [];
  }
  getId(): number {
    const data = localStorage.getItem('personalData'); // Lấy dữ liệu từ localStorage
    if (data) {
      const parsedData = JSON.parse(data); // Parse dữ liệu JSON
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        const lastItem = parsedData[parsedData.length - 1]; // Lấy phần tử cuối cùng
        return lastItem.id + 1; // Trả về ID mới là ID của phần tử cuối + 1
      }
    }
    return 1; // Nếu không có dữ liệu, trả về ID mặc định là 1
  }
  add() {
    this.submitted = true;
    if (this.form.valid) {
      const formData: person = {
        id: this.getId(),
        fullname: (document.getElementById('fullname') as HTMLInputElement).value,
        ngaySinh: (document.getElementById('ngaySinh') as HTMLInputElement).value,
        cccd: (document.getElementById('cccd') as HTMLInputElement).value,
        gioiTinh: (document.getElementById('gioiTinh') as HTMLSelectElement).value,
        diaChi: (document.getElementById('diaChi') as HTMLSelectElement).value,
        fbWeb: (document.getElementById('fbWeb') as HTMLInputElement).value,
        transactions: [],
        balance: 0, 
        ngay: new Date()  
      };
      this.jsonArrayData.push(formData);
      this.saveDataToLocalStrorage(this.jsonArrayData);
      console.log('Retrieved Data:', this.jsonArrayData);
      this.saveDataToLocalStrorage(this.jsonArrayData);
      alert(`Thêm thành công rồi nhé!`);
      this.router.navigate(['display']);
      this.submitted = false;
    }
  }
}
