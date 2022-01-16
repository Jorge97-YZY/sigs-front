import { Router} from '@angular/router';
import { ServicoService } from './../servico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ClientesService } from './../../clientes/clientes.service';
import { Cliente } from 'src/app/models/cliente';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.scss'],
  preserveWhitespaces: true
})
export class ServicoFormComponent implements OnInit, OnDestroy {

  $unsub = new Subject();
  form!: FormGroup;
  clientes!: Cliente[];
  errors!: String[];

  constructor(
    private clienteService: ClientesService,
    private service: ServicoService,
    private fb: FormBuilder,
    private router: Router,
    private msg: SharedService
  ) { }


  ngOnInit(): void {
    this.createForm();
    this.clienteService.list().pipe(takeUntil(this.$unsub)).subscribe(
      response => this.clientes = response
    )


  }

  createForm() {
    this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(150)]],
      idCliente: [],
      preco: ['', Validators.required],
      data: ['', Validators.required]
    })
  }
  onSubmit(){

    this.service.create(this.form.value).pipe(
      takeUntil(this.$unsub)
      ).subscribe(response => {
      this.form.reset();
      this.msg.msgSuccess('Serviço', 'Guardado com Sucesso!')
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
