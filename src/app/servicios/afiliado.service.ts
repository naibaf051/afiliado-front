import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class AfiliadoService extends GeneralService {
  constructor(public _http: HttpClient) {
    super(_http);
  }

  obtenerTodos() {
    return this.metodoGet<any>(`/afiliado/todos`);
  }

  guardar(json: any) {
    return this.metodoPost<any>(`/afiliado`, json);
  }

  actualizar(json: any, id: number) {
    return this.metodoPut<any>(`/afiliado/${id}`, json);
  }

  eliminar(id: number) {
    return this.metodoDelete<any>(`/afiliado/${id}`);
  }
}
