import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './shared/news/news.component';
import { ShopListComponent } from './shop/shop-list/shop-list.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

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
    canActivate: [],
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
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLogin }
  },
  {
    path: 'news',
    component: NewsComponent
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
