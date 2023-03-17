import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResult, IHeaderBoard, MessageCount } from './http.type';
import { VertifyEmailCode } from '../type';

const headerBoardUrl = "api/board/loadBoard";

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

const API = {
  SEND_EMAIL: '/api/sendEmailCode',
  HEADER_BOARD: 'api/board/loadBoard',
  MESSAGE_COUNT: 'api/ucenter/getMessageCount'
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  loadHeaderBoard() {
    return this.http.get<IHeaderBoard>(API.HEADER_BOARD);
  }

  sendEmailCode<T>(params: VertifyEmailCode) {
    return this.post<T>(API.SEND_EMAIL, params);
  }

  getMessageCount() {
    return this.post<HttpResult<MessageCount>>(API.MESSAGE_COUNT, null);
  }

  post<T>(url: string, params: any) {
    const formData = new FormData();
    Object.keys(params).forEach( (key: string) => {
      formData.append(key, params[key]);
    })

    return this.http.post<T>(url, formData);
  }
}
