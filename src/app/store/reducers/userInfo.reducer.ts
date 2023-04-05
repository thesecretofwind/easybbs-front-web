import { createReducer, on } from "@ngrx/store";
import { userInfoAction } from "../actions/userInfo.action";

export interface State {
  userId: string;
}
export const featureKey = 'user';

export const initialState: State = {
  userId: ''
}

export const reducer = createReducer(initialState,
  on(userInfoAction, (state: State, data: State) => ({userId: data.userId}))
  )
