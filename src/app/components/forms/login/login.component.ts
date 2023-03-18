import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import {  MODAL_TYPE } from 'src/app/components/header/header.type';
import { HomeService } from 'src/app/services/home.service';
import { HttpResult } from 'src/app/services/http.type';
import { Login, LoginResult } from 'src/app/type';
import { formMessage, validatorNumber } from '../validator-rules';


export const api = {
  checkCode: "/api/checkCode",
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // @Input() modalTypeChange !: modalTypeChange;
  @Output() modalTypeChange = new EventEmitter<MODAL_TYPE>();
  validateForm!: FormGroup;
  passwordVisible = false;
  isLoading: boolean = false;
  checkCode: string = api.checkCode;
  constructor(private fb: FormBuilder, private message: NzMessageService, private home: HomeService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      checkCode: ['', [Validators.required, Validators.pattern(validatorNumber)]],
      remember: [false]
    });
    this.validateForm.valueChanges.subscribe((data:any) => {
      console.log(this.validateForm);

    })
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      // console.log('submit', this.validateForm.value);
      const {email, password, checkCode} = this.validateForm.value;
      const params: Login = {
        email,
        password,
        checkCode
      };
      this.isLoading = true;
      this.home.login(params).subscribe((res: HttpResult<LoginResult>) => {
        this.isLoading = false;
        const {status, info, code, data} = res;
        if (status === 'success') {
          this.message.success(info);
        }
        // TODO:登录成功后的处理
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  changeCheckCodeImg() {
    this.checkCode = `${api.checkCode}?type=0&time="${new Date().getTime()}"`
  }

  goToResetPassword(event: MouseEvent) {
    event.preventDefault();
    this.modalTypeChange.emit(2)
    // this.modalTypeChange(2);
  }

  goToRegister(event: MouseEvent) {
    event.preventDefault();
    // this.modalTypeChange(0);
    this.modalTypeChange.emit(0)
  }

  getErrorMessage(key: string, type: string) {
    const targetErrorObj = formMessage[key as keyof typeof formMessage];
    return targetErrorObj[type as keyof typeof targetErrorObj];
  }

}
