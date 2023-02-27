import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  orders: any
  products: any
  slicedOrderId: any
  initialOrderId: any
  deliveryDetails:any
  totalAmount:any

  constructor(private api: ApiServicesService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userId = localStorage.getItem('userId')
      this.api.getOrder(userId).subscribe((result: any) => {
        console.log(result);
        this.orders = result.orders
        this.initialOrderId = result.orders[0]._id
        console.log(this.initialOrderId);
        this.api.getOrderProducts(this.initialOrderId).subscribe((result: any) => {
          console.log(result);
          this.products = result.orderItems
          this.slicedOrderId = result.orderItems[0]._id.slice(18)
          console.log(this.slicedOrderId);


        })
        this.api.getOrderDetails(this.initialOrderId).subscribe((result:any)=>{
          console.log(result);
          this.deliveryDetails=result.deliveryDetails[0].deliveryDetails
          console.log(this.deliveryDetails);

          this.totalAmount=result.deliveryDetails[0].totalAmount

          
          
        })
      })
      } else {
        alert('please login')
      this.router.navigateByUrl('')
      }

  }

    productDetails(orderId: any){
      let userId = localStorage.getItem('userId')

      this.api.getOrderProducts(orderId).subscribe((result: any) => {
        console.log(result);
        this.products = result.orderItems
        this.slicedOrderId = result.orderItems[0]._id.slice(18)
        console.log(this.slicedOrderId);

      })

      this.api.getOrderDetails(orderId).subscribe((result:any)=>{
        console.log(result);
        this.deliveryDetails=result.deliveryDetails[0].deliveryDetails
        console.log(this.deliveryDetails);

        this.totalAmount=result.deliveryDetails[0].totalAmount
        
        
      })


    }
  }
