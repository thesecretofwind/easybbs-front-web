import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 通用与布局
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

// 导航类
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

// 数据输入类(表单组件)
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

// 数据展示类
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

// 反馈类
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpinModule } from 'ng-zorro-antd/spin';

const moduleArr = [
  NzButtonModule,
  NzLayoutModule,
  NzDropDownModule,
  NzMenuModule,
  NzPaginationModule,
  NzCheckboxModule,
  NzFormModule,
  NzInputModule,
  NzAvatarModule,
  NzBadgeModule,
  NzCardModule,
  NzCommentModule,
  NzEmptyModule,
  NzImageModule,
  NzPopoverModule,
  NzListModule,
  NzTabsModule,
  NzTagModule,
  NzToolTipModule,
  NzMessageModule,
  NzModalModule,
  NzPopconfirmModule,
  NzSpinModule,
  NzBreadCrumbModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...moduleArr],
  exports: [...moduleArr],
})
export class SharedModule {}
