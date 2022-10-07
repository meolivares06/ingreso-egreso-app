import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  crearUsuario(nombre: string, email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword (email, password);
  }
}
