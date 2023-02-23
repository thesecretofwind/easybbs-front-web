import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHeaderBoard } from './http.type';

const headerBoardUrl = "api/board/loadBoard";
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  loadHeaderBoard() {
    return this.http.get<IHeaderBoard>(headerBoardUrl);
  }
}
