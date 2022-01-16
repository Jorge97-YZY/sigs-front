import { ServicoListarComponent } from './servico-listar/servico-listar.component';
import { ServicoFormComponent } from './servico-form/servico-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'novo', component: ServicoFormComponent
  },
  {
    path: 'listar', component: ServicoListarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicosRoutingModule { }
