import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadComponent } from './load/load.component';



@NgModule({
  declarations: [
    LoadComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadComponent
  ]
})
export class SharedModule { }
