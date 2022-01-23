import { AuthService } from './../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Sexo } from 'src/app/models/sexo';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit, OnDestroy {
  $unsub = new Subject();
  form!: FormGroup;
  errors!: String[];
  listSexo!: Sexo[];

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private msg: SharedService
  ) { }

  ngOnInit(): void {
    this.listSexo = this.sexo()
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(150)]],
      telefone:['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dataNasc: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      sexo: ['', Validators.required],
      status: [true]
    })
  }

  sexo(): Sexo[] {
    return [
      { sexo: 'Masculino', valor: 'M' },
      { sexo: 'Femenino', valor: 'F' }
    ]
  }

  onSubmit(){
    this.service.guardar(this.form.value).pipe(
      takeUntil(this.$unsub)
      ).subscribe(response => {
      this.router.navigate(['/login']);
      this.msg.msgSuccess('Cadastro', 'Usuario Cadastrado com Sucesso!')
    }, errorResponse => {
        this.errors = errorResponse.error.errors;
        for(let i = 0; i<this.errors.length; i++){
          let errMsg = this.errors[i];
          this.msg.msgError(errMsg, 'Erro!')
        }
      })
  }

  ngOnDestroy(): void {
    this.$unsub.next();
    this.$unsub.complete();
  }
}
