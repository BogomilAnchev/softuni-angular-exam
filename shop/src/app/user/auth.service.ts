import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: Observable<any>;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.userData = new Observable((subscriber) => {
      this.auth.onAuthStateChanged(subscriber)
    });
  }

  async register(email: string, password: string) {
    try {
      const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
      console.log(newUser);

      return true
    } catch (error) {
      console.log('Sign in failed', error);
      return false;
    }
  }

  async login(email: string, password: string) {
    try {
      const newUser = await this.auth.signInWithEmailAndPassword(email, password);
      console.log(newUser);

      return true;
    } catch (error) {
      console.log('Sign in failed', error);
      return false;
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
      return true;
    } catch (error) {
      console.log('Sign out failed', error);
      return false;
    }
  }
}
