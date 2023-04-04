import { Component, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { MODAL_TYPE, Title } from './header.type';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RegisterComponent } from '../forms/register/register.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UserStateService } from '../../services/user-state.service';
import { UserState } from '../../type';
import { HomeService } from '../../services/home.service';
import { HttpResult, IHeaderBoard, MessageCount } from '../../services/http.type';
import { Observable } from 'rxjs';

export const titleList: Title[] = [
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
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()  navArr!: IHeaderBoard[];
  logoInfo = titleList;
  isVisible = false;
  modalTitle = '登录';
  modalType: MODAL_TYPE = MODAL_TYPE.REGISTER;
  userInfo: UserState = {
    userId: '',
    avatarUrl: '',
  };
  messageobj: MessageCount = {
    downloadAttachment: 0,
    likeComment: 0,
    likePost: 0,
    reply: 0,
    sys: 0,
    total: 0,
  };

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private userStateService: UserStateService,
    public home: HomeService
  ) {}

  ngOnInit(): void {
    this.userStateService.userState$.subscribe((user: UserState) => {
      this.userInfo = user;
      this.home.getMessageCount().subscribe((res: HttpResult<MessageCount>) => {
        const { data } = res;
        if (!data) {
          return;
        }
        this.messageobj = data;
      });
    });
    // this.home.loadHeaderBoard().subscribe((res: HttpResult<IHeaderBoard[]>) => {
    //   const {status, data} = res;
    //   if (status === 'success') {
    //     this.navArr = data;
    //   }
    // });
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

  changeModalType(modalType: MODAL_TYPE) {
    this.isVisible = true;
    this.modalType = modalType;
    switch (modalType) {
      case MODAL_TYPE.LOGIN:
        this.modalTitle = '登录';
        break;
      case MODAL_TYPE.REGISTER:
        this.modalTitle = '注册';
        break;
      case MODAL_TYPE.RESET_PASSWORD:
        this.modalTitle = '重置密码';
        break;
      default:
        this.modalTitle = 'xxx';
    }
  }
}
