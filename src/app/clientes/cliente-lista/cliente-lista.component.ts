import { ClientesService } from './../clientes.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss'],
  preserveWhitespaces:true
})
export class ClienteListaComponent implements OnInit {

  clientes!: Cliente[];
  constructor(
    private service: ClientesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getCliente().subscribe(response => this.clientes=response);
  }

  onCliente(){
    this.router.navigate(['/clientes/novo']);

  }
}
