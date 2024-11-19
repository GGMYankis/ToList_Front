import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MessageService } from 'primeng/api';
import { setInfoUser, setToken } from '../Helpers/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formulario: FormGroup;

  error: boolean = false;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router

  ) {

    this.formulario = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

  }
  login() {
    this.loginService.Login(this.formulario.value).subscribe({
      next: (data) => {
        if (!data.status) {
          this.error = true;
          // Manejo de error cuando el backend retorna un estado de error
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
          return;
        }

        setToken(data.value);
        setInfoUser(JSON.stringify(data.value.user));
        this.router.navigate(['pages/teams']);
      },
      error: (err) => {
        alert('Ha ocurrido un error')
        console.error('Error en la llamada al servicio:', err);

      },
    });
  }


}
