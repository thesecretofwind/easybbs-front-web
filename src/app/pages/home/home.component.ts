import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { HttpResult, IHeaderBoard } from '../../types/http.type';
import { AppState } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserInfo } from 'src/app/store/selectors/userInfo.selector';
import { boardAction } from 'src/app/store/actions/board.action';
import { userInfoAction } from 'src/app/store/actions/userInfo.action';
import { selectBoards } from 'src/app/store/selectors/board.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  navArr!: IHeaderBoard[];
  // userObservable!: Observable<string>;
  // boardsObservalbe!: Observable<IHeaderBoard[]>;
  constructor(private home: HomeService, private store: Store<AppState>) {
    // this.userObservable = this.store.pipe(select(selectUserInfo));
    // this.boardsObservalbe = this.store.pipe(select(selectBoards));
   }

  ngOnInit(): void {
    this.home.loadHeaderBoard().subscribe( (item: HttpResult<IHeaderBoard[]>) => {
      console.log(item);
    });
    this.home.loadHeaderBoard().subscribe((res: HttpResult<IHeaderBoard[]>) => {
      const {status, data} = res;
      if (status === 'success') {
        this.navArr = data;
        this.store.dispatch(boardAction({boards: data}));
      }
    });
  }

  updateUserInfo() {
    this.store.dispatch(userInfoAction({userId: 'hhhh'}))
  }
}
