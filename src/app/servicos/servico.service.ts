import { Pesquisa } from './../models/pesquisa';
import { Servico } from './../models/servico';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicoBusca } from '../models/servicoBusca';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicoService extends CrudService<Servico> {

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API}servicos-prestados`);
  }

  buscar(pesquisa: Pesquisa): Observable<ServicoBusca[]> {
    const httpParams = new HttpParams()
      .set("nome", pesquisa.nome)
      .set("mes", pesquisa.mes ? pesquisa.mes.toString() : '');
    const url = `${environment.API}servicos-prestados?${httpParams.toString()}`
    return this.http.get<any>(url).pipe(
      delay(2000)
    );
  }
}
