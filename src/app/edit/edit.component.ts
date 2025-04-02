import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { person } from '../../../model/person.model';
import { HomeComponent } from '../home/home.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, ReactiveFormsModule, HomeComponent, TranslateModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
 
  @Input() ID="";

  personalData: person[] = [];
  form!: FormGroup;
  selectedPerson: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.callData();
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;
    if (id !== null && !isNaN(id)) {
      this.load(id);
    } else {
      console.error('ID không hợp lệ:', idParam);
    }
  }
  callData() {
    const data = localStorage.getItem('personalData');
    this.personalData = data ? JSON.parse(data) : [];
  }

  load(id: number) {
    this.selectedPerson = this.personalData.filter(
      (person) => person.id === id
    );
    if (this.selectedPerson[0]) {
      if (!this.form) {
        this.form = this.fb.group({
          id: ['', Validators.required],
          fullname: ['', Validators.required],
          ngaySinh: ['', Validators.required],
          cccd: ['', Validators.required],
          gioiTinh: ['', Validators.required],
          diaChi: ['', Validators.required],
          fbWeb: ['', [Validators.required, Validators.pattern('https?://.+')]],
        });
      }
      this.form.patchValue(this.selectedPerson[0]);
    } else {
      console.error('Không tìm thấy người với ID:', id);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      // Cập nhật dữ liệu và lưu lại vào localStorage
      const updatedData = this.form.value;
      const index = this.personalData.findIndex(
        (person) => person.id === updatedData.id
      );
      if (index !== -1) {
        this.personalData[index] = updatedData;
        localStorage.setItem('personalData', JSON.stringify(this.personalData));
        alert('Đã sửa dữ liệu thành công');
        this.router.navigate(['display']);
        console.log('Dữ liệu đã được cập nhật:', updatedData);
      } else {
        console.error('Không tìm thấy người với ID:', updatedData.id);
      }
    } else {
      console.error('Biểu mẫu không hợp lệ');
    }
  }
}
