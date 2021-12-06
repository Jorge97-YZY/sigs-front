import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { SharedModule } from '../shared/shared.module';
import { ClienteEditarComponent } from './cliente-editar/cliente-editar.component';


@NgModule({
  declarations: [
    ClienteFormComponent,
    ClienteListaComponent,
    ClienteEditarComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ClientesModule { }
