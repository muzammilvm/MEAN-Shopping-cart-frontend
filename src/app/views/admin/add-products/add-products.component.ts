import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as fileUpload from 'express-fileupload';
import { ApiServicesService } from 'src/app/services/api-services.service';



@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  productForm = this.fb.group({
    name: ['', [Validators.required]],
    category: ["", [Validators.required]],
    price: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    description: ['', [Validators.required]],
    // Image: ['', [Validators.required]]
  })

  image: any = ''
  productId: string = ''
  imageUrl = ""

  constructor(private fb: FormBuilder, private api: ApiServicesService, private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('admin')) {
      alert('Please Login')
      this.router.navigateByUrl('/admin-login')
    }
  }


  addProduct() {
    if (this.productForm.valid) {
      let name = this.productForm.value.name
      let category = this.productForm.value.category
      let price = this.productForm.value.price
      let description = this.productForm.value.description

      this.api.upload(this.image).subscribe((data: any) => {
        console.log(data);
        this.imageUrl = data.data.url
        this.api.addProduct(name, category, price, description, this.imageUrl).subscribe((result: any) => {

          console.log(result);
          alert(result.message)
          this.productId = result.id
          console.log(this.imageUrl);
  
          this.productForm.reset()
  
          // this.router.navigateByUrl('/admin-login')
        },
          // using another callback for catching error
          (result: any) => {
            alert(result.error.message)
          })
  
      })

    

    } else {
      alert('Invalid Form')
    }
  }

  addImage(event: any) {
    this.image = event.target.files[0]
    console.log(this.image);

  }


}

