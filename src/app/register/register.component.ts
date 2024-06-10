import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegisterComponent implements OnInit {
  usuarioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private mensajesService: MensajesEmergentesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.usuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]]
    });
  }

  register() {
    if (this.usuarioForm.valid) {
      const { email, password } = this.usuarioForm.value;
      this.authService.register(email, password).subscribe({
        next: () => {
          this.router.navigate(['/verify-account']);
          this.mensajesService.mostrarMensajePositivo('Registro correcto, revisa tu correo para verificar tu cuenta');
          this.usuarioForm.reset();
        },
        error: (error) => {
          this.mensajesService.mostrarMensajeNegativo('Error: No se pudo completar el registro');
          console.error('Error al registrar usuario:', error);
        }
      });
    }
  }
}
