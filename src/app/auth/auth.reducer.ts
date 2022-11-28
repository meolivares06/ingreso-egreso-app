import { createReducer, on } from '@ngrx/store';
import {Usuario} from "../models/usuario.model";
import {setUser, unSetUser} from "./auth.actions";

export interface AuthState {
  user: Usuario | null;
}

export const initialState: AuthState = {
  user: null
}

export const authReducer = createReducer(
  initialState,
  on(setUser, (state, {user}) => ({...state, user: {...user}})),
  on(unSetUser, state => ({...state, user: null}))
);
