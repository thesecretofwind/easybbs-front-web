import { createAction, props } from "@ngrx/store";
import { State } from "../reducers/board.reducer";

export const boardAction = createAction('boards', props<State>())
