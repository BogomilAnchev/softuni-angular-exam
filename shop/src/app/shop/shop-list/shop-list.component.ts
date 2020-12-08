import { Component } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent {

  currUser
  test = 1

  constructor(public auth: AuthService) {
    this.auth.authState(user => {
      if (user) {
        this.currUser = user.email
      } else {
        console.log('loggedOut');
        this.currUser = undefined
      }
    })
  }

}
