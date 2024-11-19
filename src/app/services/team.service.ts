import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApi } from '../Interfaces/Response';
import { Observable } from 'rxjs';
import { urlApi } from '../util/util';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  List(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/teams`);
  }
  ListByUser(id: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/teams/teamsOfUser/${id}`);
  }
  Register(team: any): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${urlApi}/teams`, team);
  }
}
