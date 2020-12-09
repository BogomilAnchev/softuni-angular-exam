import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public product
  public id: string
  public currUser: string
  public isAdmin: boolean = false

  constructor(public productService: ProductsService, activatedRoute: ActivatedRoute, auth: AuthService) { 

    this.id = activatedRoute.snapshot.params.id;
    productService.getProduct(this.id).then(prod => this.product = prod.data());

    auth.authState(user => {
      let email = user.email
      if (user) this.currUser = email;
      if (!user) this.currUser = undefined;
      if (email == 'bogomilanchev@gmail.com') this.isAdmin = true
      if (email != 'bogomilanchev@gmail.com') this.isAdmin = false
    })
  }

  ngOnInit(): void {

  }

  deleteHandler() {
    console.log('delete');
    
  }
}
