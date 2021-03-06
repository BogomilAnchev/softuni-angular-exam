import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopListComponent } from './shop/shop-list/shop-list.component';
import { LoginComponent } from './user/login/login.component';
import { CartComponent } from './user/cart/cart.component';
import { RegisterComponent } from './user/register/register.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { DetailsComponent } from './shop/details/details.component';
import { CreateComponent } from './shop/create/create.component';
import { AdminGuard } from './shared/admin.guard';
import { ProfileComponent } from './user/profile/profile.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login'])
const redirectToHome = () => redirectLoggedInTo(['home'])

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: ShopListComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToHome }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToHome }
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLogin }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLogin }
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AngularFireAuthGuard, AdminGuard],
    data: { authGuardPipe: redirectToLogin, isAdmin: true }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
