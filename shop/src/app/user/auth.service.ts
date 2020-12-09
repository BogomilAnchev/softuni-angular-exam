import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {

  }

  getUser = this.auth.authState.pipe(first()).toPromise()

  authState = this.auth.onAuthStateChanged

  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

}
