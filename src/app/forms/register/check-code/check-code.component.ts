import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { api } from '../../login/login.component';
import { formMessage, validatorNumber } from '../../validator-rules';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-code',
  templateUrl: './check-code.component.html',
  styleUrls: ['./check-code.component.scss']
})
export class CheckCodeComponent implements OnInit, AfterViewInit {
  @Input() email!: string;
  checkCode!: string;
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      checkCode: ['', Validators.required, Validators.pattern(validatorNumber)],
    });
  }
  
  ngAfterViewInit(): void {
    this.changeCheckCodeImg();
    this.cd.detectChanges();
  }

  changeCheckCodeImg() {
    this.checkCode = `${api.checkCode}?time="${new Date().getTime()}"`;
    return this.checkCode;
  }

  getErrorMessage(key: string, type: string) {
    const targetErrorObj = formMessage[key as keyof typeof formMessage];
    return targetErrorObj[type as keyof typeof targetErrorObj];
  }
}
