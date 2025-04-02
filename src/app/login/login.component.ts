import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { FormBuilder, FormGroup,FormsModule,ReactiveFormsModule,Validators,} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(){
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.router.navigate(['/display']); // Điều hướng đến trang "display" nếu đã đăng nhập
    }
    this.form = this.fb.group({ username: ['', Validators.required], password: ['', Validators.required], });
  }
  onLogin(){
    if (this.form.valid) {
      const { username, password } = this.form.value;
      if (username === environment.username &&password === environment.password) {
        localStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập
        this.router.navigate(['/display']);
      } else {     
        alert('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } else {
      console.log('Invalid username or password');
    }
  }
}
