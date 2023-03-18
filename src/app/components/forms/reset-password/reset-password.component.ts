import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { api } from '../login/login.component';
import { MODAL_TYPE } from 'src/app/components/header/header.type';
import {
  formMessage,
  validatorNumber,
  validatorPassword,
} from '../validator-rules';
import { EmailCodeType, ResetPassword, ResetPasswordResult } from 'src/app/type';
import { HttpResult } from 'src/app/services/http.type';
import { HomeService } from 'src/app/services/home.service';
import { CheckCodeComponent } from '../check-code/check-code.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
  @Output() modalTypeChange = new EventEmitter<MODAL_TYPE>();
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };
  passwordVisible: boolean = false;
  checkPasswordVisible: boolean = false;
  isVisible = false;
  checkCode: string = api.checkCode;
  checkCodeForm!: FormGroup;
  type = EmailCodeType.VERTIFY_EMAIL;
  isLoading: boolean = false;
  @ViewChild('checkCodeCmp') checkCodeCmp!: CheckCodeComponent;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private message: NzMessageService,
    private home: HomeService
  ) {}
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    this.changeCheckCodeImg();
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      checkEmailCode: [
        '',
        [Validators.required,
        Validators.pattern(validatorNumber)],
      ],
      nickname: [null, [Validators.required]],
      password: [
        null,
        [Validators.required, Validators.pattern(validatorPassword)],
      ],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      checkCode: ['', Validators.required, Validators.pattern(validatorNumber)],
    });
    this.checkCodeForm = this.fb.group({
      checkCode: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      // console.log('submit', this.validateForm.value);
      const {email, nickName, password,emailCode, checkCode} = this.validateForm.value;
      const params: ResetPassword = { // 我觉得这些参数是要添加上去了
        email,
        // nickName,
        password,
        // emailCode,
        checkCode
      };
      this.home.resetPassword(params).subscribe( (res: HttpResult<ResetPasswordResult>) => {
        const {status, info, code, data} = res;
        if (status === 'success') {
          this.message.success(info);
        }
        // TODO:充值密码成功后的处理
      })
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
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
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  openDialog(evnet: MouseEvent) {
    evnet.preventDefault();
    event?.stopPropagation();
    const emailControl = this.validateForm.controls.email;
    if (emailControl.invalid) {
      emailControl.markAsDirty();
      emailControl.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  getEmailCheckCode() {
    const checkCodeControl = this.checkCodeForm.controls.checkCode;
    if (checkCodeControl.errors?.wrongCheckCode) {
      return;
    }
    if (checkCodeControl.invalid) {
      checkCodeControl.markAsDirty();
      checkCodeControl.updateValueAndValidity({ onlySelf: true });
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
          const { info, status } = res;
          if (status === 'error') {
            checkCodeControl.setErrors({
              wrongCheckCode: info,
            });
            // this.changeCheckCodeImg();
            this.checkCodeCmp.changeCheckCodeImg();
          }
          if (status === 'success') {
            this.isVisible = false;
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  goToLogin() {
    this.modalTypeChange.emit(1);
  }

  getErrorMessage(key: string, type: string) {
    const targetErrorObj = formMessage[key as keyof typeof formMessage];
    return targetErrorObj[type as keyof typeof targetErrorObj];
  }
}
