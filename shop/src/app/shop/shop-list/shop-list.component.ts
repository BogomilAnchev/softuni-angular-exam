import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  public allProds: any[]
  public products: any[]
  public inputValue: string = ''
  public isLoading: boolean

  public from: number
  public to: number
  public pages: any[]
  public currPage: number = 1

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
        this.allProds = arr
      } else {
        this.allProds = arr.filter(x => {
          return x.info.title.toLowerCase().includes(search.toLowerCase())
        })
      }
      this.from = 0;
      this.to = 5
      this.products = this.allProds.slice(this.from, this.to)

      let pagesArr = []
      pagesArr.length = Math.ceil((this.allProds.length) / 5)
      this.pages = pagesArr.fill(1)

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

  sort(type) {
    this.allProds.sort((a, b) => {
      return type == 'asc' ? +a.info.price - +b.info.price : +b.info.price - +a.info.price
    })
    this.from = 0;
    this.to = 5
    this.products = this.allProds.slice(this.from, this.to)
  }

  next() {
    if (this.to >= this.allProds.length) { return; }
    this.from = this.from + 5;
    this.to = this.to + 5
    this.products = this.allProds.slice(this.from, this.to)
  }

  prev() {
    if (this.from == 0) { return; }
    this.from = this.from - 5;
    this.to = this.to - 5;
    this.products = this.allProds.slice(this.from, this.to)
  }

  takePage(event: Event) {
    let target = event.target as HTMLElement;
    this.currPage = +target.innerHTML;

    if (this.currPage == 1) {
      this.from = 0;
      this.to = 5;
    } else {
      this.from = (this.currPage - 1) * 5
      this.to = this.currPage * 5
    }

    this.products = this.allProds.slice(this.from, this.to)
  }
}
