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
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  async login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    return this.auth.signOut();
  }
}
