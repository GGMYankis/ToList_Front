import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/Response';
import { urlApi } from '../util/util';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  List(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/user`);
  }
  ListAdmin(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/user/ListAdmin`);
  }


  ListByTeam(idTeam: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/user/ListByTeam/${idTeam}`);
  }

  Register(request: any): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${urlApi}/user`, request);
  }


  Edit(request: any): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${urlApi}/user`, request);
  }
}
