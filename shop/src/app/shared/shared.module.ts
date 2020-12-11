import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminGuard } from './admin.guard';



@NgModule({
  declarations: [
    LoaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    AdminGuard
  ],
  exports: [
    LoaderComponent
  ]
})
export class SharedModule { }
