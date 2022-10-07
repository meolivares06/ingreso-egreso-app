import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

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
    if(this.registroForm.invalid) return;
    const {nombre, email, password } = this.registroForm.value;

    this.authService.crearUsuario(nombre, email, password).then(credentials => {
      console.log(credentials);
      this.router.navigate(['/'])
    })
      .catch(error => console.error(error));
  }
}
