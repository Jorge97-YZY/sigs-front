import { takeUntil } from 'rxjs/operators';
import { Usuario } from './../../models/usuario';
import { AuthService } from './../../auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  $unsub = new Subject();
  usuarioLogado!: string;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.getUser();
    this.authService.getAllUser().pipe(takeUntil(this.$unsub)).subscribe(response => {
      const user = response.filter(m => m.username === this.authService.getUser())
      this.usuarioLogado = user.map(m => m.nome).toString();
    })


  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.$unsub.next();
    this.$unsub.complete();
  }

}
