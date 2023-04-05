import { createReducer, on } from "@ngrx/store";
import { boardAction } from "../actions/board.action";
import { IHeaderBoard } from "src/app/services/http.type";

export interface State {
  boards: IHeaderBoard[];
}
export const featureKey = 'boards';

export const initialState: State = {
  boards: []
}

export const reducer = createReducer(initialState,
  on(boardAction, (state: State, data: State) => ({boards: data.boards}))
  )
