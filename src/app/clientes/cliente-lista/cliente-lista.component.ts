import { ClientesService } from './../clientes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss'],
  preserveWhitespaces:true
})
export class ClienteListaComponent implements OnInit, OnDestroy {

  $unsub = new Subject();
  clientes!: Cliente[];
  load: boolean = true;
  constructor(
    private service: ClientesService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.service.list().pipe(
      takeUntil(this.$unsub)
    ).subscribe(response => {
      this.clientes=response;
      this.load = false;
    });
  }

  onCliente(){
    this.router.navigate(['/clientes/novo']);

  }

  ngOnDestroy(): void {
   this.$unsub.next();
   this.$unsub.complete();
  }
}
