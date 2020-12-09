import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NewsComponent } from './news/news.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoreModule } from '../core/core.module';



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
  ],
  exports: [
    LoaderComponent
  ]
})
export class SharedModule { }
