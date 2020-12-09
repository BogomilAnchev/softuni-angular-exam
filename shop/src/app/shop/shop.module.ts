import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ProductsService } from './products.service';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShopListComponent,
    DetailsComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductsService
  ],
  exports: [
    ShopListComponent
  ]
})
export class ShopModule { }
