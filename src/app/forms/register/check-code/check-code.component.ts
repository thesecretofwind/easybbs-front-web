import { Component, Input, OnInit } from '@angular/core';
import { api } from '../../login/login.component';
import { formMessage } from '../../validator-rules';

@Component({
  selector: 'app-check-code',
  templateUrl: './check-code.component.html',
  styleUrls: ['./check-code.component.scss']
})
export class CheckCodeComponent implements OnInit {
  @Input() email!: string;
  checkCode!: string;

  constructor() { }

  ngOnInit(): void {
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
