import { ClienteEditarComponent } from './cliente-editar/cliente-editar.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'novo', component: ClienteFormComponent
  },
  {
    path: 'editar/:id', component: ClienteEditarComponent
  },
  {
    path: 'listar', component: ClienteListaComponent
  },
  {
    path: '', redirectTo: '/clientes/listar', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
