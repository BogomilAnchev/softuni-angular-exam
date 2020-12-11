import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  public user: { email: string, names: string }
  public isLoading: boolean = false
  public orders: any
  public detailsToShowMapping: any
  public details: boolean = false

  constructor(public userService: UserService) {
    userService.authState(user => {
      if (user) {
        this.user = {
          email: user.email,
          names: user.displayName
        }
        if (this.user.email == 'bogomilanchev@gmail.com') { return ;}
        this.isLoading = true
        this.userService
          .getOrders(this.user.email)
          .then(cart => {
            let data: any = cart.data()
            this.orders = data.orders
            this.detailsToShowMapping = this.orders.map(x => x = false)
         
            this.isLoading = false
          })
          .catch(err => console.log(err));
      } else {
        this.orders = [];
        this.user = undefined
      }
    })
  }

  toggleDetails(i) {
    this.detailsToShowMapping[i] = !this.detailsToShowMapping[i]   
  }

}
