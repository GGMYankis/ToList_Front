import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-spinner-login',
  standalone: true,
  imports: [MaterialModule],
  template: `
  <div class="loading-login" *ngIf="isLoading$ | async">
    <div class="box">
        <h2>Cargando</h2>
        <p>Por favor espera.</p>
        <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</div>
  `,
  styleUrl: './spinner-login.component.css'
})
export class SpinnerLoginComponent {

  isLoading$;

  constructor(public spinnerService: SpinnerService) {
    this.isLoading$ = this.spinnerService.isLoadingLogin$;
  }
}
