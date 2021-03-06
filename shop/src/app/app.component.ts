import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  constructor(router: Router, auth: UserService) {
    router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const c = this. outlet.component;
    });
    
  }

  ngOnInit() {
    
  }
}
