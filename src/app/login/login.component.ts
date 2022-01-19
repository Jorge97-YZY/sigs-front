import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  $unsub = new Subject();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder
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

  onSubmit(){
    console.log(this.form.value);
  }


  ngOnDestroy(): void {
      this.$unsub.next();
      this.$unsub.complete();
  }

}
