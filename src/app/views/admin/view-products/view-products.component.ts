import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  products: any

  constructor(private router: Router, private api: ApiServicesService) { }

  ngOnInit() {
    if (!localStorage.getItem('adminName')) {
      this.router.navigateByUrl('/admin-login')
    }

    this.api.adminViewProducts().subscribe((result: any) => {
      console.log(result.products);
      this.products = result.products

    })

  }

 
  deleteProduct(productId: any) {
    console.log(productId);
    if(window.confirm('Are sure you want to delete this item ?')){
      this.api.deleteProduct(productId).subscribe((result: any) => {
        console.log(result);
        alert(result.message)
        location.reload()
      })     }
   
  }
}
