import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigaionComponent } from './navigaion/navigaion.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavigaionComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavigaionComponent,
    FooterComponent
  ]
})
export class CoreModule { }
