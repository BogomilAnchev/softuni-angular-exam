import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  constructor(router: Router, auth: AuthService) {
    router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const c = this. outlet.component;
    });
    
  }

  ngOnInit() {
    
  }
}
