import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import Swal from "sweetalert2";
import {map, Observable, Subscription} from "rxjs";
import {Usuario} from "../models/usuario.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AppState} from "../app.reducer";
import {setUser, unSetUser} from "../auth/auth.actions";
import {Store} from "@ngrx/store";


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{
  subscriptions: Subscription[] = [];
  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore, private _store: Store<AppState>) { }

  isAutheticated(): Observable<boolean> {
    // si es null false
    // distinto de null true
    return this.auth.authState.pipe(
      map(fbUser => fbUser !== null)
    );
  }
  initAuthListener(): void {
    this.auth.authState.subscribe((fireBaseUser) => {
      console.log(fireBaseUser?.uid);
      if(fireBaseUser){
        this.subscriptions.push(this.firestore.doc(`${fireBaseUser.uid}/usuario`).valueChanges()
          .subscribe(user => {
              console.log(user)
              this._store.dispatch(setUser({
                // @ts-ignore
                user: Usuario.fromFirebase(user)
              }))
            },
            error => {
              console.log(error)
            }));
      }else{
        this._store.dispatch(unSetUser());
      }
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
    return this.auth.signOut().then(() => {
      console.log('logout')
      this.subscriptions.forEach(s => s.unsubscribe());
      this._store.dispatch(unSetUser());
    });
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
