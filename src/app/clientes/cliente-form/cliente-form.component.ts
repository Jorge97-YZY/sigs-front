import { ClientesService } from './../clientes.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
  preserveWhitespaces:true
})
export class ClienteFormComponent implements OnInit {

  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: ClientesService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

createForm() {
  this.form = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(150)]],
    email: ['', [Validators.required, Validators.email]],
    telefone: [null,[Validators.required, Validators.maxLength(9)]],
    bi: ['', [Validators.required, Validators.maxLength(14)]]
  })
}

onSubmit(){
    this.service.postCliente(this.form.value).subscribe(response=>{
      console.log(response);
    })
}

}
