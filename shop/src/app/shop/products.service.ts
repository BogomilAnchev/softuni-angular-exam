import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) {

  }

  getProducts() {
    return this.firestore.collection('products').get();
  }

  getProduct(id: string) {
    return this.firestore.collection('products').doc(id).get().toPromise()
  }

  createProduct(product) {
    return this.firestore.collection('products').add(product);
  }

  deleteProduct(productId) {
    this.firestore.doc('products/' + productId).delete();
  }
  
  updateProduct(productId, product) {
    return this.firestore.doc('products/' + productId).update(product);
  }
}
