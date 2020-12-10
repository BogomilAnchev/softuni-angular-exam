import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit{

  products

  constructor(public productService: ProductsService) {
       
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.map(item => {
        let info = item.payload.doc.data();
        return {
          id: item.payload.doc.id,
          info
        }
      })
    })
    console.log(this.products);
    
  }
}
