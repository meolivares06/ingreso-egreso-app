import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

import Swal from 'sweetalert2'
import {Store} from "@ngrx/store";
import {isLoading, stopLoading} from "../../shared/ui.actions";
import {AppState} from "../../app.reducer";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  cargando = false;

  subscriptions: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.subscriptions.push(this._store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    }));
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this._store.dispatch(isLoading());

      const {email, password} = this.loginForm.value;
      this.authService.loginUsuario(email, password)
        .then(_ => {
          this._store.dispatch(stopLoading());
          this.router.navigate(['/']).then();
        })
        .catch(({ message, name  }) => {
          this._store.dispatch(stopLoading());
          Swal.fire({
            icon: 'error',
            title: name,
            text: message
          });
        });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
