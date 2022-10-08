import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import Swal from "sweetalert2";
import {map, Observable} from "rxjs";
import {Usuario} from "../models/usuario.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) { }

  isAutheticated(): Observable<boolean> {
    // si es null false
    // distinto de null true
    return this.auth.authState.pipe(
      map(fbUser => fbUser !== null)
    );
  }
  initAuthListener(): void {
    this.auth.authState.subscribe((fireBaseUser) => {
      console.log(fireBaseUser);
    });
  }

  crearUsuario(nombre: string, email: string, password: string): Promise<void |firebase.auth.UserCredential> {

    return this.auth.createUserWithEmailAndPassword (email, password)
      .then(({user}) => {
          // @ts-ignore
        const newUser = new Usuario(user.uid, nombre, user.email);
          return this.firestore.doc(`${user?.uid}/usuario`).set({...newUser});
      });
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
