import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpEventType,
  HttpResponse,
  HttpErrorResponse,
  HttpResponseBase
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators'
import { AppState } from '../store';
import { Store } from '@ngrx/store';
import { userInfoAction } from '../store/actions/userInfo.action';
import { NzNotificationService } from 'ng-zorro-antd/notification';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest'
  })
};

const CODEMESSAGE = new Map([
  [200, '服务器成功返回请求的数据。'],
  [201, '新建或修改数据成功。'],
  [202, '一个请求已经进入后台排队（异步任务）。'],
  [204, '删除数据成功。'],
  [400, '发出的请求有错误，服务器没有进行新建或修改数据的操作。'],
  [401, '用户没有权限（令牌、用户名、密码错误）。'],
  [403, '用户得到授权，但是访问是被禁止的。'],
  [404, '发出的请求针对的是不存在的记录，服务器没有进行操作。'],
  [406, '请求的格式不可得。'],
  [410, '请求的资源被永久删除，且不会再得到的。'],
  [422, '当创建一个对象时，发生一个验证错误。'],
  [500, '服务器发生错误，请检查服务器。'],
  [502, '网关错误。'],
  [503, '服务可用，服务器暂时过载或维护。'],
  [504, '网关超时。'],
]);

@Injectable()
export class HttInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>, private notification: NzNotificationService) {}

  handleError(res: HttpResponseBase): Observable<any> {
    const status = res.status;
    if (status >= 200 && status < 300) {
      return of(res);
    }
    const errortext = CODEMESSAGE.get(status) || res.statusText;
    this.notification.error('提醒', errortext, {nzPlacement: 'bottomRight'});
    return of(res);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      mergeMap( (res: HttpEvent<any>) => {
        if (res instanceof HttpResponse) {
          const data = res.body.data;
          const code = data.code;
          if (code === 901) {
            this.store.dispatch(userInfoAction({userId: ''}));
          }
        }
        return of(res);
      }),
      catchError((err: HttpErrorResponse) => this.handleError(err))
    );
  }
}
