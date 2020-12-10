import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { DetailsComponent } from '../details/details.component';
import { ProductsService } from '../products.service';

function checkPrice(control: AbstractControl): ValidationErrors | null {
  let val = control.value;
  if (val === null || val === '') return null;
  if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'checkPrice': true };
  return null;
};

function checkUrl(control: AbstractControl): ValidationErrors | null {
  let val = control.value;
  if (val === null || val === '') return null;
  if (!val.toString().match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) return { 'checkUrl': true };
  return null;
};

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  @Input() isEdit: boolean;
  editProduct
  editProductId

  form: FormGroup
  isLoading: boolean = false

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public productService: ProductsService,
    public detailsComp: DetailsComponent
  ) {
    this.editProduct = detailsComp.product
    this.editProductId = detailsComp.productId

    this.form = fb.group({
      title: [this.editProduct?.title || '', [Validators.required, Validators.minLength(6)]],
      price: [this.editProduct?.price || '', [Validators.required, checkPrice]],
      imageUrl: [this.editProduct?.imageUrl || '', [Validators.required, checkUrl]],
      description: [this.editProduct?.description || '', [Validators.required, Validators.minLength(50)]]
    })
  }

  submitHandler() {
    if (!this.editProduct) {
      this.productService.createProduct(this.form.value)
        .then(res => {
          this.router.navigate([''])
        })
        .catch(err => console.log(err))
    } else {
      this.productService.updateProduct(this.editProductId, this.form.value).then(res => {
        this.router.navigate([''])
      })
        .catch(err => console.log(err))
    }
  }
}
