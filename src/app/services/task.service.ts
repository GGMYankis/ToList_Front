import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/Response';
import { urlApi } from '../util/util';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  ListMyTask(id: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/task-master/user/${id}`);
  }
  List(idTeam: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/task-master/${idTeam}`);
  }

  Register(task: any): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${urlApi}/task-master`, task);
  }

  Edit(task: any): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${urlApi}/task-master`, task);
  }


  ChangeStatus(task: any): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${urlApi}/task-master/status`, task);
  }

  ListColor(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/task-master/${0}`);
  }
  RegisterComment(coment: any): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${urlApi}/comment`, coment);
  }
  ViewComment(idTask: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/comment/${idTask}`);
  }

  Revisada(idTask: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/task-master/revisada/${idTask}`);
  }
}
