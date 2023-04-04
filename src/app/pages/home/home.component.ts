import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { HttpResult, IHeaderBoard } from '../../services/http.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  navArr!: IHeaderBoard[];
  constructor(private home: HomeService) { }

  ngOnInit(): void {
    this.home.loadHeaderBoard().subscribe( (item: HttpResult<IHeaderBoard[]>) => {
      console.log(item);
    });
    this.home.loadHeaderBoard().subscribe((res: HttpResult<IHeaderBoard[]>) => {
      const {status, data} = res;
      if (status === 'success') {
        this.navArr = data;
      }
    });
  }

}
