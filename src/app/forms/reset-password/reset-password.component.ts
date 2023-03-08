import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { api } from '../login/login.component';
import { MODAL_TYPE } from 'src/app/header/header.type';
import { formMessage, validatorNumber, validatorPassword } from '../validator-rules';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {

  @Output() modalTypeChange = new EventEmitter<MODAL_TYPE>();
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  passwordVisible: boolean = false;
  checkPasswordVisible: boolean = false
  isVisible = false;
  checkCode: string = api.checkCode;
  checkCodeForm!: FormGroup;
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
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    this.changeCheckCodeImg();
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      checkEmailCode: ['', Validators.required, Validators.pattern(validatorNumber)],
      nickname: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern(validatorPassword)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      checkCode: ['', Validators.required, Validators.pattern(validatorNumber)],
    });
    this.checkCodeForm = this.fb.group({
      checkCode: ['', [Validators.required, Validators.pattern(validatorNumber)]],
    });
  }

  confirmationValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  changeCheckCodeImg() {
    this.checkCode = `${api.checkCode}?time="${new Date().getTime()}"`;
    // return this.checkCode;
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  openDialog(evnet:MouseEvent){
    evnet.preventDefault();
    event?.stopPropagation();
    const emailControl = this.validateForm.controls.email;
    if (emailControl.invalid) {
      emailControl.markAsDirty();
      emailControl.updateValueAndValidity({onlySelf: true});
      return;
    }
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  getEmailCheckCode() {

  }

  goToLogin() {
    this.modalTypeChange.emit(1);
  }

  getErrorMessage(key: string, type: string) {
    const targetErrorObj = formMessage[key as keyof typeof formMessage];
    return targetErrorObj[type as keyof typeof targetErrorObj];
  }

}
