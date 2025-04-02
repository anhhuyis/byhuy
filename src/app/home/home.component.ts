import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Dropdown } from 'bootstrap';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule, TranslateModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  name: string = environment.username;
  public static usd: number = 25500; // Tỷ giá USD/VND
  selectedLang: string = localStorage.getItem('lang') || 'vi';
  @Output() changelang = new EventEmitter<string>();

  constructor(private router: Router, public translate: TranslateService) {}
  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      this.router.navigate(['/login']); // Điều hướng về trang đăng nhập nếu chưa đăng nhập
    }
    // Lấy ngôn ngữ từ localStorage nếu có
  const savedLang = localStorage.getItem('lang');
  if (savedLang) {
    this.useLanguage(savedLang); 
  }
  }
  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
  useLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('lang', language);
    this.selectedLang = language;
    this.changelang.emit(language);
  }
  ngAfterViewInit() {
    document.querySelectorAll('.dropdown-toggle').forEach(dropdown => {
      new Dropdown(dropdown);
    });
  }
}
