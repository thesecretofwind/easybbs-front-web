import { ActionReducerMap } from "@ngrx/store";
import * as fromUserInfo from './reducers/userInfo.reducer';
import * as fromBoard from './reducers/board.reducer'

export interface AppState {
  [fromUserInfo.featureKey]: fromUserInfo.State;
  [fromBoard.featureKey]: fromBoard.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromUserInfo.featureKey]: fromUserInfo.reducer,
  [fromBoard.featureKey]: fromBoard.reducer,
}
