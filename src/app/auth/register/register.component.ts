import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Subscription} from "rxjs";
import {AppState} from "../../app.reducer";
import {isLoading, stopLoading} from "../../shared/ui.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registroForm!: FormGroup;
  subscriptions: Subscription[] = [];
  cargando = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private _store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
        nombre: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      }
    );
    this.subscriptions.push(this._store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
    }))
  }

  crearUsuario() {
    if(this.registroForm.valid) {
      this._store.dispatch(isLoading());
      const {nombre, email, password} = this.registroForm.value;

      this.authService.crearUsuario(nombre, email, password).then(_ => {
        this._store.dispatch(stopLoading());
        this.router.navigate(['/'])
      })
        .catch(({message, name}) => {
          this._store.dispatch(stopLoading());
          Swal.fire({

            icon: 'error',
            title: name,
            text: message
          });
        });
    }
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
