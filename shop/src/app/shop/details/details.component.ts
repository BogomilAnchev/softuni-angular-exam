import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public product
  public productId: string
  public currUser: string
  public isAdmin: boolean = false
  public isLoading: boolean = false
  public isEdit: boolean = true
  public toggleEdit: boolean = false

  constructor(
    public productService: ProductsService,
    public activatedRoute: ActivatedRoute,
    public auth: AuthService,
    public router: Router
  ) {

    this.productId = activatedRoute.snapshot.params.id;

    auth.authState(user => {
      let email = user.email
      if (user) this.currUser = email;
      if (!user) this.currUser = undefined;
      if (email == 'bogomilanchev@gmail.com') this.isAdmin = true
      if (email != 'bogomilanchev@gmail.com') this.isAdmin = false
    })
  }

  ngOnInit(): void {
    this.isLoading = true
    this.productService
      .getProduct(this.productId)
      .then(prod => {
        this.product = prod.data();
        this.isLoading = false
      })
      .catch(err => console.log(err));
  }

  deleteHandler() {
    this.productService.deleteProduct(this.productId)
    this.router.navigate([''])
  }

  edit() {
    this.toggleEdit = !this.toggleEdit
  }
}
