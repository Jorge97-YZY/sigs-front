import { takeUntil } from 'rxjs/operators';
import { ServicoService } from './../servico.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ServicoBusca } from 'src/app/models/servicoBusca';

@Component({
  selector: 'app-servico-listar',
  templateUrl: './servico-listar.component.html',
  styleUrls: ['./servico-listar.component.scss']
})
export class ServicoListarComponent implements OnInit, OnDestroy {

  $unsub = new Subject();
  form!: FormGroup;
  meses: number[];
  lista!: ServicoBusca[];
  message: string = '';
  load: boolean = false;
  constructor(
    private fb: FormBuilder,
    private service: ServicoService
  ) {
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12]

  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
     nome: [''],
     mes: []
    })
  }

  onSubmit(){
    this.load = true
    this.service.buscar(this.form.value).pipe(
      takeUntil(this.$unsub)
    ).subscribe(response => {
      this.lista = response
      this.load= false
      if(this.lista.length <= 0){
        this.message = ' Nenhum Registro encontrado.'
      } else {
        this.message = '';

      }
    })

  }

  ngOnDestroy(): void {
    this.$unsub.next();
    this.$unsub.complete();
  }

}
