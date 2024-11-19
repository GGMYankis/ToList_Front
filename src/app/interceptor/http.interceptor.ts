import { HttpInterceptorFn } from '@angular/common/http';
import { SpinnerService } from '../services/spinner.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';



export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  const spinnerService = inject(SpinnerService);

  if (req.url == 'https://tolist-9uwp.onrender.com/login') {
    showSpinner('login', spinnerService)
  } else {
    showSpinner('other', spinnerService)
  }
  return next(req).pipe(
    finalize(() => {
      spinnerService.hide();
    })
  );
};



function showSpinner(type: string, spinnerService: SpinnerService) {

  if (type == "login") {
    spinnerService.showLogin();
  }

  if (type == "other") {
    spinnerService.show();
  }
}