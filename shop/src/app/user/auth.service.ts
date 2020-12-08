import { applySourceSpanToStatementIfNeeded } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public signedIn: Observable<any>;
  public isLogged: boolean = false;

  constructor(private auth: AngularFireAuth) {

    this.signedIn = new Observable((subscriber) => {
      this.auth.onAuthStateChanged(subscriber);
    });
    
  }

  authState = this.auth.onAuthStateChanged

  currUser = this.auth.currentUser

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
