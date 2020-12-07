import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-navigaion',
  templateUrl: './navigaion.component.html',
  styleUrls: ['./navigaion.component.css']
})
export class NavigaionComponent implements OnInit {

  public authUser: Subscription
  isLogged = false
  test = 'test'

  constructor(private auth: AuthService, private router: Router) { 
    this.authUser = this.auth.userData.subscribe(user => {
      if (user) {
        this.isLogged = true
      } else {
        this.isLogged = false
      }
    })
  }

  ngOnInit(): void {
  }

  logoutHandler(): void {
    this.auth.logout()
    this.router.navigate(['login'])
  }
}
