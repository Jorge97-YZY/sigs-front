import { ClientesService } from './../clientes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
  preserveWhitespaces: true
})
export class ClienteFormComponent implements OnInit, OnDestroy {

  $unsub = new Subject();
  form!: FormGroup;
  success: boolean = false;
  errors!: String[];
  constructor(
    private fb: FormBuilder,
    private service: ClientesService,
    private router: Router,
    private msg: SharedService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: [ ,[Validators.required, Validators.maxLength(9)]],
      bi: ['', [Validators.required, Validators.maxLength(14)]]
    })
  }

  onSubmit() {

    this.service.create(this.form.value).pipe(
      takeUntil(this.$unsub)
      ).subscribe(response => {
      this.router.navigate(['/clientes/listar']);
      this.msg.msgSuccess('Cadastro', 'Cliente Cadastrado com Sucesso!')
    }, errorResponse => {
        this.errors = errorResponse.error.errors;
        for(let i = 0; i<this.errors.length; i++){
          let errMsg = this.errors[i];
          this.msg.msgError(errMsg, 'Erro!')
        }
      })


  }
  onCancel() {
    this.router.navigate(['/clientes/listar']);

  }
  ngOnDestroy(): void {
    this.$unsub.next();
    this.$unsub.complete();
  }

}
