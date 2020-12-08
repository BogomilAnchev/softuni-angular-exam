import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-navigaion',
  templateUrl: './navigaion.component.html',
  styleUrls: ['./navigaion.component.css']
})
export class NavigaionComponent implements OnDestroy {

  public authUser: Subscription
  isLogged = false

  constructor(private auth: AuthService, private router: Router) { 
    this.authUser = this.auth.userData.subscribe(user => {
      if (user) {
        this.isLogged = true
      } else {
        this.isLogged = false
      }
    })
  }

  ngOnDestroy(): void {
    if (this.authUser) this.authUser.unsubscribe()
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
