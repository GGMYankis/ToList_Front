import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SpinnerInterceptorComponent } from "./components/spinner-interceptor/spinner-interceptor.component";
import { SpinnerLoginComponent } from "./components/spinner-login/spinner-login.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, ReactiveFormsModule, SpinnerInterceptorComponent, SpinnerLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {



  title = 'TaskMaster';
}
