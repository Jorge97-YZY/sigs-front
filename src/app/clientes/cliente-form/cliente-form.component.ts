import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

}
