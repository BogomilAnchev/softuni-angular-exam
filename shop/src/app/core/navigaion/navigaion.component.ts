import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-navigaion',
  templateUrl: './navigaion.component.html',
  styleUrls: ['./navigaion.component.css']
})
export class NavigaionComponent {

  public currUser: string
  public isAdmin: boolean = false


  constructor(public user: UserService, public router: Router) {
    
    user.authState(user => {
      let email = user?.email    
      if (user) this.currUser = email;
      if (!user) this.currUser = undefined;
      if (email == 'bogomilanchev@gmail.com') {
        this.currUser = 'Administrator!!!'
        this.isAdmin = true
      } else {
        this.currUser = email;
        this.isAdmin = false
      }
    })
  }

  async logoutHandler() {
    try {
      await this.user.logout()
      this.router.navigate(['login'])
    } catch (err) {
      console.log(err);
    }
  }
}
