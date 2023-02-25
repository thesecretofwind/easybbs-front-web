import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MODAL_TYPE, Title } from './header.type';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RegisterComponent } from '../forms/register/register.component';

const titleList: Title[] = [
  {
    letter: 'E',
    color: 'rgb(50, 133, 255)'
  },
  {
    letter: 'a',
    color: 'rgb(251, 54, 36)'
  },
  {
    letter: 's',
    color: 'rgb(255, 186, 2)'
  },
  {
    letter: 'y',
    color: 'rgb(50, 133, 255)'
  },
  {
    letter: 'b',
    color: 'rgb(37, 178, 78)'
  },
  {
    letter: 'b',
    color: 'rgb(253, 50, 36)'
  },
  {
    letter: 's',
    color: 'rgb(255, 186, 2)'
  },
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logoInfo = titleList;
  isVisible = false;
  modalTitle = '登录';
  modalType: MODAL_TYPE = MODAL_TYPE.REGISTER;
  constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.modalType = 2
    }, 5000)
  }


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  openDialog(modalType: MODAL_TYPE) {
    this.isVisible = true;
    this.modalType = modalType;
    this.modalTitle = modalType === MODAL_TYPE.LOGIN ? '登录' : '注册';
  }

}
