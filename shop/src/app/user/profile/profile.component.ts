import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  public userCart: any
  public user: {email: string, names: string}
  public isLoading: boolean = false
  public total: number = 0

  constructor(public userService: UserService) {
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
}
