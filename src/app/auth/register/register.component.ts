import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
        nombre: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      }
    );
    console.log(this.registroForm.valid)
  }

  crearUsuario() {
    if(this.registroForm.valid) {
      this.showLoading();
      const {nombre, email, password} = this.registroForm.value;

      this.authService.crearUsuario(nombre, email, password).then(_ => {
        this.hideLoading();
        this.router.navigate(['/'])
      })
        .catch(({message, name}) => {
          this.hideLoading();
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
}
