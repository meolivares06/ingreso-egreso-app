import { createReducer, on } from '@ngrx/store';
import {isLoading, stopLoading} from "./ui.actions";

export interface UiState {
  isLoading: boolean;
}

export const initialState: UiState = {
  isLoading: false
}

export const uiReducer = createReducer(
  initialState,
  on(isLoading, state => ({...state, isLoading: true})),
  on(stopLoading, state => ({...state, isLoading: false}))
);
