import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public auth: AngularFireAuth, public fireStore: AngularFirestore) {
  }

  currUser = this.auth.currentUser

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

  setCart(email, newCart) {
    return this.fireStore.collection('cart').doc(email).set({ cart: { cart: newCart } })
  }

  getCart(email) {
    return this.fireStore.collection('cart').doc(email).get().toPromise()
  }

}
