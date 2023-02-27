import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Razorpay } from 'razorpay-checkout';
import { ApiServicesService } from 'src/app/services/api-services.service';


@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit{

  totalPrice: any
  orderPlaced: boolean = false
  orderId: any

  placeOrderForm = this.fb.group({
    address: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
    pincode: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    mobile: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    payment: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder, private api: ApiServicesService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userId = localStorage.getItem('userId')
      this.api.getTotalAmount(userId).subscribe((total: any) => {
        console.log(total);
        this.totalPrice = total.total
      })
    } else {
      alert('please login')
      this.router.navigateByUrl('')
    }

  }

  placeOrder() {
    let userId = localStorage.getItem('userId')
    if (this.placeOrderForm.valid) {
      if (this.placeOrderForm.value.payment == "COD") {
        console.log(this.placeOrderForm.value);
        this.api.placeOrder(this.placeOrderForm.value, this.totalPrice, userId).subscribe((result: any) => {
          this.orderId = result.orderId
          setTimeout(() => {
            this.placeOrderForm.reset()
            this.orderPlaced = true
          }, 1000);
        })
      } else{
              
        this.api.placeOrder(this.placeOrderForm.value, this.totalPrice, userId).subscribe((result: any) => {
          this.orderId = result.orderId
          setTimeout(() => {
            this.placeOrderForm.reset()
            this.orderPlaced = true
          }, 1000);
        })
        
      }

    } else {
      alert('please enter complete details')
    }
  }

//   razorpay(){
//     const options = {
//       "key":"rzp_test_QOajpfPm6LbWoP", // Enter the Key ID generated from the Dashboard
//       "amount": this.totalPrice*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//       "currency": "INR",
//       "name": "Muza Industries",
//       "description": "Test Transaction",
//       "image": "https://example.com/your_logo",
//       // "order_id": "1", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//       "callback_url":"" ,
//       "prefill": {
//         "name": "Gaurav Kumar",
//         "email": "gaurav.kumar@example.com",
//         "contact": "9000090000"
//       },
//       "notes": {
//         "address": "Razorpay Corporate Office"
//       },
//       "theme": {
//         "color": "#3399cc"
//       }
//     };

//     let rzp1 = new Razorpay(options);
//     rzp1.open();
    

//   }

}
