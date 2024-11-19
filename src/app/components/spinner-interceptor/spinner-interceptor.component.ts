import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-spinner-interceptor',
  standalone: true,
  imports: [MaterialModule],
  template: `
  <div class="overlay"  *ngIf="isLoading$ | async">
  <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
</div>
`,
  styleUrl: './spinner-interceptor.component.css',
})
export class SpinnerInterceptorComponent {

  isLoading$;

  constructor(public spinnerService: SpinnerService) {
    this.isLoading$ = this.spinnerService.isLoading$;
  }

}
