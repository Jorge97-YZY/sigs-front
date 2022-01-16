import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicosRoutingModule } from './servicos-routing.module';
import { ServicoFormComponent } from './servico-form/servico-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ServicoListarComponent } from './servico-listar/servico-listar.component';


@NgModule({
  declarations: [
    ServicoFormComponent,
    ServicoListarComponent
  ],
  imports: [
    CommonModule,
    ServicosRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ServicosModule { }
