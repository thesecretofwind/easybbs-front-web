import { Component, Input, OnInit } from '@angular/core';
import { api } from '../../login/login.component';

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
}
