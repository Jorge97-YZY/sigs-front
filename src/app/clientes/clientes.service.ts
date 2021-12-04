import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private readonly API = `${environment.API}clientes`;

  constructor(
    private http: HttpClient
  ) { }

  getCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }
  postCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.API, cliente);
  }

}
