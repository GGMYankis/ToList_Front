import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApi } from '../Interfaces/Response';
import { Observable } from 'rxjs';
import { urlApi } from '../util/util';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  Login(request: any): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${urlApi}/login`, request);
  }

}
