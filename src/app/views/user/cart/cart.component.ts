import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ajax } from 'jquery';
import { ApiServicesService } from 'src/app/services/api-services.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any
  totalPrice: number = 0
  // $: any;
  constructor(private router: Router, private api: ApiServicesService) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      let userId = localStorage.getItem('userId')
      this.api.viewCart(userId).subscribe((result: any) => {
        if (result) {
          this.products = result.products
          console.log(this.products);

          this.api.getTotalAmount(userId).subscribe((total: any) => {
            console.log(total);
            this.totalPrice = total.total
          })


        }
      })
      // ajax
      // $.ajax({

      //   url: 'http://localhost:3000/view-totalAmount/' + userId,
      //   method: 'get',
      //   success: (response: any) => {

      //     if (response) {
      //       console.log(response);
      //       this.total = response.total
      //     }

      //   }
      // })

    } else {
      alert('please login')
      this.router.navigateByUrl('')
    }

  }


  removeProduct(cartId: any, productId: any) {
    console.log(cartId, productId);
    if (window.confirm('Are sure you want to delete this item from cart?')) {
      this.api.removeProductFromCart(cartId, productId).subscribe((result: any) => {
        if (result) {

          console.log(result);
          location.reload()
        }
      })
    }
  }

  // removeitem(cartId:any, productId:any) {
  //   console.log(cartId);

  //   $.ajax({
  //       url: 'http://localhost:3000/remove-cartProduct',
  //       data: {
  //           cartId:cartId,
  //           productId:productId
  //       },
  //       method: 'post',
  //       success: (response:any) => {
  //           if (response.removeproduct) {
  //               confirm('Do you want to Remove this item from the cart?')
  //               location.reload()
  //           }

  //       }
  //   })
  // }

  changeQuantity(cartId: any, productId: any, count: any, quantity: any) {
    console.log(cartId, productId, count, quantity);
    let userId = localStorage.getItem('userId')

    if (count == -1 && quantity == 1) {

      if (window.confirm('Are sure you want to delete this item from cart?')) {
        this.api.changeQuantity(cartId, productId, userId, count, quantity).subscribe((result: any) => {
          location.reload()
        })
      }
    } else {
      this.api.changeQuantity(cartId, productId, userId, count, quantity).subscribe((result: any) => {
        console.log(result);
        // location.reload()
        let userId = localStorage.getItem('userId')
        this.api.viewCart(userId).subscribe((result: any) => {
          if (result) {
            this.products = result.products
            console.log(this.products);

            this.api.getTotalAmount(userId).subscribe((total: any) => {
              console.log(total);
              this.totalPrice = total.total
            })

          }
        })
      })
    }
  }
}



