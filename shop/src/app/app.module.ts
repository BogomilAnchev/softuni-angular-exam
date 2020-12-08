import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from "@angular/fire";
import { environment } from '../environments/environment';

import { SharedModule } from './shared/shared.module'
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';
import { AuthService } from './user/auth.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SharedModule,
    CoreModule,
    UserModule,
    ShopModule
  ],
  providers: [AuthService],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
