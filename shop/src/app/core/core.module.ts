import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigaionComponent } from './navigaion/navigaion.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NavigaionComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    NavigaionComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
