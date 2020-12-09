import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) {

  }

  getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }

  getProduct(id: string) {
    return this.firestore.collection('products').doc(id).get().toPromise()
  }
}
