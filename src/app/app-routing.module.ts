import { AuthService } from './auth.service';
import { LayoutComponent } from './layout/layout.component';
import { CadastroComponent } from './auth/cadastro/cadastro.component';
import { LoginComponent } from './auth/login/login.component';
import { ClientesModule } from './clientes/clientes.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'cadastro', component: CadastroComponent
  },
  {
    path: '', component: LayoutComponent, children: [
      {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard]
      },
      {
        path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule), canActivate: [AuthGuard]
      },
      {
        path: 'servicos', loadChildren: () => import('./servicos/servicos.module').then(m => m.ServicosModule), canActivate: [AuthGuard]
      },
      {
        path: '', redirectTo: '/home', pathMatch:'full'
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
