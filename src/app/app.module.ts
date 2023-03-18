import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  PlusOutline,
  SearchOutline,
  EyeOutline,
  EyeInvisibleOutline,
  UserOutline,
  LockOutline,
  MailOutline,
  SafetyOutline,
  NotificationFill,
} from '@ant-design/icons-angular/icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/forms/register/register.component';
import { LoginComponent } from './components/forms/login/login.component';
import { ResetPasswordComponent } from './components/forms/reset-password/reset-password.component';
import { CheckCodeComponent } from './components/forms/check-code/check-code.component';
import { UserInfoComponent } from './components/forms/user-info/user-info.component';
import { UserCenterComponent } from './pages/user-center/user-center.component';
import { FooterComponent } from './components/footer/footer.component';

const icons: IconDefinition[] = [
  PlusOutline,
  SearchOutline,
  EyeOutline,
  EyeInvisibleOutline,
  UserOutline,
  LockOutline,
  MailOutline,
  SafetyOutline,
  NotificationFill,
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    CheckCodeComponent,
    UserInfoComponent,
    UserCenterComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NzIconModule.forChild(icons),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
