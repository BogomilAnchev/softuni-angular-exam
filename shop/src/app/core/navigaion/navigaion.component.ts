import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-navigaion',
  templateUrl: './navigaion.component.html',
  styleUrls: ['./navigaion.component.css']
})
export class NavigaionComponent implements OnInit {

  public currUser: string
  public isAdmin: boolean = false
  public sub: Promise<any>


  constructor(public user: UserService, public router: Router) {
    
    this.sub = user.authState(user => {
      let email = user?.email    
      if (user) this.currUser = email;
      if (!user) this.currUser = undefined;
      if (email == 'admin@gmail.com') {
        this.currUser = 'Administrator!!!'
        this.isAdmin = true
      } else {
        this.currUser = email;
        this.isAdmin = false
      }
    })
  }

  ngOnInit() {
    
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
