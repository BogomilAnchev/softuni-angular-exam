import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public userCart: any
  public user: { email: string, names: string }
  public isLoading: boolean = false
  public total: number = 0

  constructor(public userService: UserService, public router: Router) {
    userService.authState(user => {
      if (user) {
        this.user = {
          email: user.email,
          names: user.displayName
        }
        this.isLoading = true
        this.userService
          .getCart(this.user.email)
          .then(cart => {
            this.userCart = cart.data()
            this.isLoading = false
            this.userCart.cart.cart.forEach(prod => {
              this.total += +prod.price * +prod.qty
            });
          })
          .catch(err => console.log(err));
      } else {
        this.userCart = [];
        this.user = undefined
      }
    })

  }

  clearCart() {
    this.userCart.cart.cart = []
    this.total = 0
    this.userService.setCart(this.user.email, [])
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  add(id) {
    this.isLoading = true
    let updatedCart = this.userCart.cart.cart.slice()
    let index = updatedCart.findIndex(prod => prod.id == id)
    updatedCart[index].qty++
    this.total += +updatedCart[index].price
    this.userCart.cart.cart = updatedCart
    this.userService.setCart(this.user.email, updatedCart)
      .then(res => this.isLoading = false)
      .catch(err => console.log(err))
  }

  sub(id) {
    this.isLoading = true
    let updatedCart = this.userCart.cart.cart.slice()
    let index = updatedCart.findIndex(prod => prod.id == id)
    updatedCart[index].qty--
    this.total -= +updatedCart[index].price
    if (updatedCart[index].qty == 0) {
      updatedCart.splice(index, 1)
    }
    this.userCart.cart.cart = updatedCart
    this.userService.setCart(this.user.email, updatedCart)
      .then(res => this.isLoading = false)
      .catch(err => console.log(err))
  }

  order() {
    
  }
}
