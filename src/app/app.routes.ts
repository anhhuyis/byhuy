import { Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DisplayComponent } from './display/display.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { PopupThuChiComponent } from './popup-thu-chi/popup-thu-chi.component';
import { PopupHistoryComponent } from './popup-history/popup-history.component';

export const routes: Routes = [
  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'home', component: HomeComponent },
  { path: 'display', component: DisplayComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'detail', component: DetailComponent},
  { path: 'popup-thu-chi/:id', component: PopupThuChiComponent },
  { path: 'popup-history/:id', component: PopupHistoryComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

];
