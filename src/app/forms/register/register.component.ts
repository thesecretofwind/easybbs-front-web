import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { api } from '../login/login.component';
import { MODAL_TYPE } from 'src/app/header/header.type';

const pattern = /^(?=.*\d)(?=.*[a-z])( ?=.*[A-Z])(?=.*[! #$%^&*]) [ \da-zA-Z!#$%^&*]{8,16}$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() modalType: MODAL_TYPE = MODAL_TYPE.REGISTER;
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

  constructor(private fb: FormBuilder,  private cd: ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    this.changeCheckCodeImg();
    this.cd.detectChanges();
  }
  ngOnChanges(changes: SimpleChanges): void {
    const modalType = changes.modalType.currentValue;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      checkEmailCode: ['', Validators.required],
      nickname: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      checkCode: ['', Validators.required],
    });
  }

  getFormItemsByModalType(modalType: MODAL_TYPE) { // 尝试动态构建表单(暂时失败)
    const baseFormItems = {
      email: [null, [Validators.email, Validators.required]],
      checkEmailCode: ['', Validators.required],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      checkCode: ['', Validators.required],
    }
    const registerFormItem = {
      nickname: [null, [Validators.required]]
    }
    if (this.modalType === MODAL_TYPE.REGISTER) {
      return {...baseFormItems, ...registerFormItem};
    }
    return baseFormItems;
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
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

  getEmailCheckCode() {

  }
  handleCancel() {
    this.isVisible = false;
  }

  changeCheckCodeImg() {
    this.checkCode = `${api.checkCode}?time="${new Date().getTime()}"`;
    // return this.checkCode;
  }

  goToLogin() {
    this.modalTypeChange.emit(1);
  }
}
