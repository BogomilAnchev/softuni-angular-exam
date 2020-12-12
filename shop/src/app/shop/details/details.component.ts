import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public product: any
  public productId: string
  public currUser: string
  public isAdmin: boolean = false
  public isLoading: boolean = false
  public toggleEdit: boolean = false
  public userCart: any[]

  constructor(
    public productService: ProductsService,
    public activatedRoute: ActivatedRoute,
    public auth: UserService,
    public router: Router
  ) {

    this.productId = activatedRoute.snapshot.params.id;

    auth.authState(user => {
      let email = user?.email
      if (user) {
        this.currUser = email;
        this.auth
          .getCart(this.currUser)
          .then(cart => {
            let data: any = cart.data()
            this.userCart = data.cart
          })
          .catch(err => console.log(err));
      }

      if (!user) {
        this.userCart = [];
        this.currUser = undefined
      }

      email == 'admin@gmail.com' ? this.isAdmin = true : this.isAdmin = false

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

  addToCart() {
    let currProdId = this.productId;
    let currCart = this.userCart

    let indexIfExisting = currCart.findIndex(prod => prod.id == currProdId)

    if (indexIfExisting >= 0) {
      currCart[indexIfExisting].qty++
    } else {
      this.product.id = this.productId;
      this.product.qty = 1
      currCart.push(this.product)
    }
 
    this.auth.setCart(this.currUser, currCart)
      .then(res => {
        this.router.navigate(['cart'])
      })
      .catch(err => console.log(err));
  }
}
