import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NewsComponent } from './news/news.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoreModule } from '../core/core.module';
import { AdminGuard } from './admin.guard';



@NgModule({
  declarations: [
    LoaderComponent,
    NewsComponent,
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
