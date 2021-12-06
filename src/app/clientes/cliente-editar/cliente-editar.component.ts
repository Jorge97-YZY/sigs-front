import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.scss'],
  preserveWhitespaces: true
})
export class ClienteEditarComponent implements OnInit, OnDestroy {

  $unsub = new Subject();
  form!: FormGroup;
  cliente: Cliente = {
    id: 0,
    nome: '',
    bi: '',
    telefone: 0,
    email: '',
    dataCadastro: ''
  };

  success: boolean = false;
  errors!: String[];
  constructor(
    private fb: FormBuilder,
    private service: ClientesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.findById();
  }
  createForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: [null, [Validators.required, Validators.maxLength(9)]],
      bi: ['', [Validators.required, Validators.maxLength(14)]]
    })
  }

  findById(): void {
    this.route.params.pipe(
      takeUntil(this.$unsub)
      ).subscribe((params: any) => {
      const id = +params['id'];
      this.service.findById(id).pipe(
        takeUntil(this.$unsub)
      ).subscribe(response => {
       this.updateForm(response)
       this.cliente = response
      })
    })
  }

  updateForm(cliente: Cliente) {
    this.form.patchValue({
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      bi: cliente.bi,
      dataCadastro: cliente.dataCadastro
    })
  }

  onSubmit() {
    this.service.create(this.form.value).pipe(
      takeUntil(this.$unsub)
      ).subscribe(response => {
      this.cliente = response;
      this.success = true;
      this.errors = [];
    },
      errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
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
