import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopListComponent } from './shop-list/shop-list.component';



@NgModule({
  declarations: [
    ShopListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShopListComponent
  ]
})
export class ShopModule { }
