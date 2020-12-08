import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-navigaion',
  templateUrl: './navigaion.component.html',
  styleUrls: ['./navigaion.component.css']
})
export class NavigaionComponent implements OnDestroy {

  public currUser: String
  public userAuth: Subscription;
  public isLogged: boolean = false

  constructor(private auth: AuthService, private router: Router) {
    this.isLogged = this.auth.isLogged
    console.log(this.isLogged);
    
    this.userAuth = this.auth.signedIn.subscribe({
      next: (user) => {
        if (user) this.currUser = user.email
        if (!user) this.currUser = undefined
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.userAuth.unsubscribe()
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
