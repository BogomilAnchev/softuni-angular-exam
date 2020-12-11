import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  public products: any
  public inputValue: string = ''
  public isLoading: boolean

  constructor(public productService: ProductsService) {

  }

  getData(search) {
    this.isLoading = true
    this.productService.getProducts().toPromise().then(data => {
      let arr = []
      data.forEach(doc => {
        let info = doc.data()
        arr.push({
          id: doc.id,
          info: info
        })

      })
      if (search == '') {
        this.products = arr
      } else {
        this.products = arr.filter(x => {
          return x.info.title.toLowerCase().includes(search.toLowerCase())
        })
      }
      this.isLoading = false
    })
  }

  ngOnInit() {
    this.getData('')
  }

  search() {
    this.getData(this.inputValue)
  }

  inputHandler(event: KeyboardEvent): void {
    this.inputValue = (event.target as any).value
  }
}
