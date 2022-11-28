import {ActionReducerMap, createReducer, on} from '@ngrx/store';
import {uiReducer, UiState} from './shared/ui.reducer';
import {authReducer, AuthState} from "./auth/auth.reducer";

export interface AppState {
  ui: UiState;
  auth: AuthState;
}

export const initialState: AppState = {
  ui: {
    isLoading: false
  },
  auth: {
    user: null
  }
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer
}
