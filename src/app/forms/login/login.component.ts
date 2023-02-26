import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MODAL_TYPE } from 'src/app/header/header.type';


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
  checkCode: string = api.checkCode;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      checkCode: ['', [Validators.required]],
      remember: [false]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
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
    this.checkCode = `${api.checkCode}?time="${new Date().getTime()}"`
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

}
