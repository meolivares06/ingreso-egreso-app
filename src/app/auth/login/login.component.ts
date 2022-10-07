import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.showLoading();
      const {email, password} = this.loginForm.value;
      this.authService.loginUsuario(email, password)
        .then(_ => {
          this.authService.hideLoading();
          this.router.navigate(['/']).then();
        })
        .catch(({ message, name  }) => {
          this.authService.hideLoading();
          Swal.fire({
            icon: 'error',
            title: name,
            text: message
          });
        });
    }
  }


}
