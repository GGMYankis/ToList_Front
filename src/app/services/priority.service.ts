import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApi } from '../Interfaces/Response';
import { urlApi } from '../util/util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {


  constructor(private http: HttpClient) { }


  List(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlApi}/priority`);
  }
}
