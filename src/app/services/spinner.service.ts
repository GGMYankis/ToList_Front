import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading$ = new Subject<boolean>();
  isLoadingLogin$ = new Subject<boolean>();
  constructor() { }

  show(): void {
    this.isLoading$.next(true)
  }

  showLogin(): void {
    console.log('se ejecuto')
    this.isLoadingLogin$.next(true)
  }
  hide(): void {
    this.isLoading$.next(false)
    this.isLoadingLogin$.next(false)
  }




}
