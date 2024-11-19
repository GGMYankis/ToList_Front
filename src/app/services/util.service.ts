import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApi } from '../Interfaces/Response';
import { urlApi } from '../util/util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }


  ListTaskStatus(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/task-status`);
  }


  ListColor(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/task-master/listColors`);
  }


  ListRoles(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/role`);
  }
}
