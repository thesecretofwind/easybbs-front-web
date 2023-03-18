import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { IHeaderBoard } from '../../services/http.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private home: HomeService) { }

  ngOnInit(): void {
    this.home.loadHeaderBoard().subscribe( (item: IHeaderBoard) => {
      console.log(item);

    })
  }

}
