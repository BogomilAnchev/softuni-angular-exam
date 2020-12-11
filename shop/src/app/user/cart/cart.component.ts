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
  public successOrder: boolean = false

  constructor(public userService: UserService, public router: Router) {
    userService.authState(user => {
      if (user) {
        this.user = {
          email: user.email,
          names: user.displayName
        }
        if (this.user.email == 'bogomilanchev@gmail.com') { return ;}
        this.isLoading = true
        this.userService
          .getCart(this.user.email)
          .then(cart => {
            let data: any = cart.data()
            this.userCart = data.cart
            
            this.userCart.forEach(prod => {
              this.total += +prod.price * +prod.qty
            });

            this.isLoading = false
          })
          .catch(err => console.log(err));
      } else {
        this.userCart = [];
        this.user = undefined
      }
    })

  }

  clearCart() {
    if (this.total == 0) { return; }

    this.isLoading = true
    this.userCart = []
    this.total = 0

    this.userService.setCart(this.user.email, [])
      .then(res => this.isLoading = false)
      .catch(err => console.log(err))
  }

  add(id) {
    this.isLoading = true
    let updatedCart = this.userCart.slice()
    let index = updatedCart.findIndex(prod => prod.id == id)
    updatedCart[index].qty++
    this.total += +updatedCart[index].price
    this.userCart = updatedCart

    this.userService
      .setCart(this.user.email, updatedCart)
      .then(res => this.isLoading = false)
      .catch(err => console.log(err))
  }

  sub(id) {
    this.isLoading = true
    let updatedCart = this.userCart.slice()
    let index = updatedCart.findIndex(prod => prod.id == id)
    updatedCart[index].qty--
    this.total -= +updatedCart[index].price

    if (updatedCart[index].qty == 0) {
      updatedCart.splice(index, 1)
    }

    this.userCart = updatedCart

    this.userService
      .setCart(this.user.email, updatedCart)
      .then(res => this.isLoading = false)
      .catch(err => console.log(err))
  }

  order() {
    if (this.total == 0) { return; }

    this.isLoading = true

    let date = new Date()
    let currDate = date.toISOString().slice(0, 10)
    let currTime = date.toISOString().slice(11, 19)
    let newOrder = {
      total: (this.total).toFixed(2),
      date: `On ${currDate} at ${currTime}`,
      products: this.userCart
    }

    this.userService
      .getOrders(this.user.email)
      .then(orders => {
        let oldOrderList: any = orders.data()
        let newOrderList = oldOrderList.orders

        newOrderList.push(newOrder)

        this.userService
          .setOrders(this.user.email, newOrderList)
          .then(res => {
            this.successOrder = true
            this.clearCart()
            setTimeout(() => {
              this.router.navigate(['profile'])
            }, 1500)
          })
      })


  }
}
