import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { UserState } from "../type";

@Injectable({
  providedIn: 'root'
})

export class UserStateService {
  userState$: Observable<UserState>;
  user: UserState = {
    userId: '',
    avatarUrl: ''
  };

  private _userState$ = new BehaviorSubject<UserState>(this.user);
  constructor() {
    this.userState$ = this._userState$.asObservable();
  }

  get userState(): UserState {
    return this._userState$.getValue();
  }

  updateUser(user: UserState) {
    this.user = user;
    this._userState$.next(this.user);
  }

}

