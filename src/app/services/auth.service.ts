import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  crearUsuario(nombre: string, email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword (email, password);
  }

  loginUsuario(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword (email, password);
  }

  logOut(): Promise<void> {
    return this.auth.signOut();
  }

  showLoading(): void {
    Swal.fire({
      title: 'loading...',
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

  hideLoading() {
    Swal.close();
  }
}
