import { LoginComponent } from './login/login.component';
import { ClientesModule } from './clientes/clientes.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: 'servicos', loadChildren: () => import('./servicos/servicos.module').then(m =>m.ServicosModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
