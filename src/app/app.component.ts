import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TranslateModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public static lang: string = "vi";
  constructor(public translate: TranslateService) {
    this.translate.addLangs(['vi', 'en']);
    this.translate.setDefaultLang('vi');
  }
  
  title = 'QuanLyKhachHang';
}
