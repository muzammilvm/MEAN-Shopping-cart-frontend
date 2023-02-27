import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId: any
  product: any
  image: any = ''
  imageUrl = ""




  productForm = this.fb.group({
    name: ['', [Validators.required]],
    category: ["", [Validators.required]],
    price: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    description: ['', [Validators.required]],
    // Image: ['', [Validators.required]]
  })

  constructor(private route: ActivatedRoute, private api: ApiServicesService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('admin')) {
      alert('Please Login')
      this.router.navigateByUrl('/admin-login')
    }

    this.productId = this.route.snapshot.paramMap.get('id');
    console.log(this.productId);
    this.api.ViewProductToEdit(this.productId).subscribe((result: any) => {
      console.log(result);
      this.product = result.product
      console.log(this.product);

      this.productForm.controls['name'].setValue(this.product.name);
      this.productForm.controls['category'].setValue(this.product.category);
      this.productForm.controls['price'].setValue(this.product.price);
      this.productForm.controls['description'].setValue(this.product.description);

    })
  }

  editProduct() {
    if (this.productForm.valid) {
      let name = this.productForm.value.name
      let category = this.productForm.value.category
      let price = this.productForm.value.price
      let description = this.productForm.value.description

      if(this.image){
        
        this.api.upload(this.image).subscribe((data: any) => {
          console.log(data);
          this.imageUrl = data.data.url
          this.api.editProduct(name, category, price, description, this.productId,this.imageUrl).subscribe((result: any) => {
  
            console.log(result);
            alert(result.message)
            this.router.navigateByUrl("/admin")
            this.productForm.reset()
  
  
            // this.router.navigateByUrl('/admin-login')
          },
            // using another callback for catching error
            (result: any) => {
              alert(result.error.message)
            })
        })
      }else{
        this.api.editProduct(name, category, price, description, this.productId,this.product.imageUrl).subscribe((result: any) => {
  
          console.log(result);
          alert(result.message)
          this.router.navigateByUrl("/admin")
          this.productForm.reset()


          // this.router.navigateByUrl('/admin-login')
        },
          // using another callback for catching error
          (result: any) => {
            alert(result.error.message)
          })
      }



    } else {
      alert('Invalid Form')
    }

  }

  addImage(event: any) {
    this.image = event.target.files[0]
    console.log(this.image);

  }

}
