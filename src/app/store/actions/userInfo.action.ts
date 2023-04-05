import { createAction, props } from "@ngrx/store";
import { State } from "../reducers/userInfo.reducer";

export const userInfoAction = createAction('user', props<State>())
