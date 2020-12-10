import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit, OnDestroy{

  public products
  public sub

  constructor(public productService: ProductsService) {
       
  }

  ngOnInit() {
    this.sub = this.productService.getProducts().subscribe(data => {
      this.products = data.map(item => {
        let info = item.payload.doc.data();
        return {
          id: item.payload.doc.id,
          info
        }
      })
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
