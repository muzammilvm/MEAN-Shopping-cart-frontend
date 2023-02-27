import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-user-view-products',
  templateUrl: './user-view-products.component.html',
  styleUrls: ['./user-view-products.component.css']
})
export class UserViewProductsComponent implements OnInit {

  products: any
  cartCount: any = 0
  poster: any

  constructor(private router: Router, private api: ApiServicesService) { }

  ngOnInit() {
    // if (!localStorage.getItem('name')) {
    //   alert('Please Login')
    //   this.router.navigateByUrl('/admin-login')
    // }
 

    this.api.viewposter().subscribe((result)=>{
      console.log(result);   
    })

    this.api.adminViewProducts().subscribe((result: any) => {
      console.log(result.products);
      this.products = result.products

    })

  }

  addToCart(productId: any) {
    if (localStorage.getItem('user')) {
      let userId = localStorage.getItem('userId')
      this.api.addTocart(productId, userId).subscribe((result: any) => {
        console.log(result);
        this.api.getCartCount(userId).subscribe((count: any) => {
          console.log(result);
          this.cartCount = count.cartcount
        })
      })
    } else {
      alert('please login')
    }

  }

  // ajax
  // addtocart(productId: any) {
  //   if (localStorage.getItem('user')) {
  //    $.ajax({
  //      let userId = localStorage.getItem('userId')

  //       url: 'http://localhost:3000/add-to-cart/' + userId + '/' + productId,
  //       method: 'get',
  //       success: (response: any) => {

  //         if (response) {
  //           console.log(response);
  //           this.api.getCartCount(userId).subscribe((result: any) => {
  //             console.log(result);

  //             this.cartCount = result.cartcount
  //           })
  //         }

  //       }
  //     })
  //   }
  // }


}