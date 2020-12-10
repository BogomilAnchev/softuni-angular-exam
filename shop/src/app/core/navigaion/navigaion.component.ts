import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-navigaion',
  templateUrl: './navigaion.component.html',
  styleUrls: ['./navigaion.component.css']
})
export class NavigaionComponent {

  public currUser: string
  public isAdmin: boolean = false

  constructor(public auth: AuthService, public router: Router) {
    auth.authState(user => {
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
      await this.auth.logout()
      this.router.navigate(['login'])
    } catch (err) {
      console.log(err);
    }
  }
}
