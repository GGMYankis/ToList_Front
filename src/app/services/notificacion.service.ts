import { Injectable } from '@angular/core';
import { ResponseApi } from '../Interfaces/Response';
import { urlApi } from '../util/util';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  constructor(private http: HttpClient) { }

  List(idUserNotificado: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/notificacion/${idUserNotificado}`);
  }

  changeStatus(idNotification: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/notificacion/changeStatus/${idNotification}`);
  }
}
