import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { delay } from 'rxjs/operators';
import { CrudService } from '../shared/crud-service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends CrudService<Cliente> {

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API}clientes`);
  }
}
