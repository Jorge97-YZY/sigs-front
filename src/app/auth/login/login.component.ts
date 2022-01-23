import { takeUntil } from 'rxjs/operators';
import { AuthService } from './../../auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  $unsub = new Subject();
  form!: FormGroup;
  loginErro: boolean = false
  cadastrando: boolean = false;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthService,
    private msg: SharedService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    this.service.tentarLogar(this.form.value).pipe(
      takeUntil(this.$unsub)
    ).subscribe(response => {
      const access_token = JSON.stringify(response);
      localStorage.setItem('access_token', access_token)
      this.router.navigate(['/home']);
    }, error => {
        this.msg.msgError('Usuario e/ou Senha encorreto(a).', 'Falha!')
    });

  }

  preparaCadastrar() {
    this.router.navigate(['/cadastro']);
  }


  ngOnDestroy(): void {
    this.$unsub.next();
    this.$unsub.complete();
  }

}
