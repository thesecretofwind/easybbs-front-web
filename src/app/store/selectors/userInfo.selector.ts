import { createSelector } from "@ngrx/store";
import { State } from "../reducers/userInfo.reducer";
import { AppState } from "..";

export const selectFeature = (state: AppState) => state.user;

export const selectUserInfo = createSelector(
  selectFeature,
  (state: State) => state.userId
)
