import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { api } from '../login/login.component';
import { MODAL_TYPE } from 'src/app/types/header.type';
import { validatorNumber, validatorPassword } from '../../../types/validator-rules';
import { formMessage } from '../../../types/validator-rules';
import { EmailCodeType, Register } from 'src/app/types/type';
import { HomeService } from 'src/app/services/home.service';
import { HttpResult } from 'src/app/types/http.type';
import { CheckCodeComponent } from '../check-code/check-code.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() modalType: MODAL_TYPE = MODAL_TYPE.REGISTER;
  @Output() modalTypeChange = new EventEmitter<MODAL_TYPE>();
  @ViewChild('checkCodeCmp') checkCodeCmp!: CheckCodeComponent;
  validateForm!: FormGroup;
  checkCodeForm!: FormGroup;
  passwordVisible: boolean = false;
  checkPasswordVisible: boolean = false
  isVisible = false;
  checkCode: string = api.checkCode;
  type = EmailCodeType.VERTIFY_EMAIL;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,  private cd: ChangeDetectorRef,  private message: NzMessageService, private home: HomeService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const modalType = changes.modalType.currentValue;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      checkEmailCode: ['',[Validators.required, Validators.pattern(validatorNumber)]],
      nickname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(validatorPassword)]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      checkCode: ['', Validators.required],
    });
    this.checkCodeForm = this.fb.group({
      checkCode: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    this.changeCheckCodeImg();
    this.cd.detectChanges();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const {email, nickName, password,emailCode, checkCode} = this.validateForm.value;
      const params: Register = {
        email,
        nickName,
        password,
        emailCode,
        checkCode
      };
      this.home.register(params).subscribe( (res: HttpResult) => {
        const {status, info, code, data} = res;
        if (status === 'success') {
          this.message.success(info);
        }
        // TODO:注册成功后的处理
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
      return { confirm: true };
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
    const checkCodeControl = this.checkCodeForm.controls.checkCode;
    if (checkCodeControl.errors?.wrongCheckCode) {
      return;
    }
    if (checkCodeControl.invalid) {
      checkCodeControl.markAsDirty();
      checkCodeControl.updateValueAndValidity({onlySelf: true});
      return;
    }
    const { checkCode } = this.checkCodeForm.value;
    this.isLoading = true;
    this.home
      .sendEmailCode<HttpResult>({
        checkCode,
        email: this.validateForm.controls.email.value,
        type: this.type,
      })
      .subscribe({
        next: (res: HttpResult) => {
           const {info, status} = res;
           if (status === 'error') {
            checkCodeControl.setErrors({
              wrongCheckCode: info
            });
            // this.changeCheckCodeImg();
            this.checkCodeCmp.changeCheckCodeImg();
           }
           if (status === 'success') {
            this.isVisible = false;
           }
        },
        error: (err: any) => {console.log(err)},
        complete: () => {
          this.isLoading = false;
        }
      });
  }
  handleCancel() {
    this.isVisible = false;
    this.checkCodeForm.reset();
  }

  changeCheckCodeImg() {
    this.checkCode = `${api.checkCode}?type=0&time="${new Date().getTime()}"`;
    // return this.checkCode;
  }

  goToLogin() {
    this.modalTypeChange.emit(1);
  }

  getErrorMessage(key: string, type: string) {
    const targetErrorObj = formMessage[key as keyof typeof formMessage];
    return targetErrorObj[type as keyof typeof targetErrorObj];
  }
}
