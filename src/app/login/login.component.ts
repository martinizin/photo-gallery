import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private mensajesService: MensajesEmergentesService
  ) { }

  ngOnInit(): void { }

  login() {
    if (this.loginFormulario.valid) {
      const { email, password } = this.loginFormulario.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/inicio']);
          this.mensajesService.mostrarMensajePositivo('Login exitoso');
        },
        error: (error) => {
          this.mensajesService.mostrarMensajeNegativo('Error: Usuario o contraseña incorrecta');
          console.error('Error al iniciar sesión:', error);
        }
      });
    }
  }
}
