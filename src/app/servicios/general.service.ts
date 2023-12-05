import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  urlService: string = environment.urlBack;
  
  constructor(public http:HttpClient) {}

  urlBack() { return this.urlService; }

  metodoGet<T>(url: string, params?: any): Observable<T>{
    return this.http.get<T>(`${this.urlBack()}${url}`, {params: params})
  }

  metodoPost<T>(url: string, body: string): Observable<T> {
    return this.http.post<T>(`${this.urlBack()}${url}`, body,{
      headers: {
        'Content-Type': 'application/json'
      }});
  }

  metodoPut<T>(url: string, body: string): Observable<T>{
    return this.http.put<T>(`${this.urlBack()}${url}`, body,{
      headers: {
        'Content-Type': 'application/json'
      }})
  }

  metodoDelete<T>(url: string): Observable<T>{
    return this.http.delete<T>(`${this.urlBack()}${url}`)
  }
}


