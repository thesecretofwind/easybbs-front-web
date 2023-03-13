import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResult, IHeaderBoard } from './http.type';
import { Login, LoginResult, Register, ResetPassword, ResetPasswordResult, VertifyEmailCode } from '../type';

const headerBoardUrl = "api/board/loadBoard";
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

const API = {
  SEND_EMAIL: '/api/sendEmailCode',
  REGISTER: '/register',
  LOGIN: '/login',
  RESET_PASSWORD: '/resetPwd',
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  loadHeaderBoard() {
    return this.http.get<IHeaderBoard>(headerBoardUrl);
  }

  sendEmailCode<T>(params: VertifyEmailCode) {
    return this.post<T>(API.SEND_EMAIL, params);
  }

  register(params: Register) {
    return this.http.post<HttpResult>(API.REGISTER, params);
  }

  login(params: Login) {
    return this.http.post<HttpResult<LoginResult>>(API.LOGIN, params);
  }

  resetPassword(params: ResetPassword) {
    return this.http.post<HttpResult<ResetPasswordResult>>(API.RESET_PASSWORD, params);
  }

  post<T>(url: string, params: any) {
    const formData = new FormData();
    Object.keys(params).forEach( (key: string) => {
      formData.append(key, params[key]);
    })

    return this.http.post<T>(url, formData);
  }
}
