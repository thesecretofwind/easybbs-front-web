import { createSelector } from "@ngrx/store";
import { State } from "../reducers/board.reducer";
import { AppState } from "..";

export const selectFeature = (state: AppState) => state.boards;

export const selectBoards = createSelector(
  selectFeature,
  (state: State) => state.boards
)
