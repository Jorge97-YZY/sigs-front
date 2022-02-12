import { ClientesService } from './../clientes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss'],
  preserveWhitespaces: true
})
export class ClienteListaComponent implements OnInit, OnDestroy {

  $unsub = new Subject();
  clientes!: Cliente[];
  clienteSelecionado!: Cliente;
  load: boolean = true;
  msgSuccess: string = '';
  msgError: string = '';

  constructor(
    private service: ClientesService,
    private router: Router,
    private msg: SharedService
  ) { }


  ngOnInit(): void {
    this.service.list().pipe(
      takeUntil(this.$unsub)
    ).subscribe(response => {
      this.clientes = response;
      this.load = false;
    });
  }

  onCliente() {
    this.router.navigate(['/clientes/novo']);
  }

  prepararDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  onDelete() {
    this.service.remove(this.clienteSelecionado.id).pipe(
      takeUntil(this.$unsub)
    ).subscribe(response => {
      this.ngOnInit();
      this.msg.msgSuccess('Cliente apagado com sucesso!', 'Apagar');
    }, error => this.msg.msgError(' Ocorreu um erro ao apagar cliente.', 'Erro!')
    );
  }
  report() {
    this.service.getReport().pipe(
      takeUntil(this.$unsub)
    ).subscribe((response: Blob) => {
      var fileURL = window.URL.createObjectURL(response);
      window.open(fileURL, '_blank');
    }
    )
  }

  ngOnDestroy(): void {
    this.$unsub.next();
    this.$unsub.complete();
  }
}
