import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators'
import { AppState } from '../store';
import { Store } from '@ngrx/store';
import { userInfoAction } from '../store/actions/userInfo.action';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest'
  })
};

@Injectable()
export class HttInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

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
      })
    );
  }
}
