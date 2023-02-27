import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-placed-orders',
  templateUrl: './placed-orders.component.html',
  styleUrls: ['./placed-orders.component.css']
})
export class PlacedOrdersComponent implements OnInit {

  orders: any
  multipleOrders: boolean = false

  constructor(private router: Router, private api: ApiServicesService) { }


  ngOnInit(): void {
    if (localStorage.getItem('adminName')) {
      this.api.getUserOrders().subscribe((result: any) => {
        console.log(result);
        this.orders = result.orders

        // let i: number = 0
        // let j: number = 0

        // for (i = 0; i <= this.orders.length - 1; i++) {
        //   for (j = i + 1; j <= this.orders.length - 1; j++) {
        //     if (this.orders[i].orderId==this.orders[j].orderId){
        //       this.multipleOrders=this.orders[i],this.orders[j]
        //       console.log(this.multipleOrders);

        //     }
        //   }
        // }

      })
    } else {
      this.router.navigateByUrl('/admin-login')
    }
  }


  shipOder(orderId: any) {
    console.log(orderId);
    this.api.shipOrders(orderId).subscribe((result:any)=>{
      console.log(result);
      location.reload()
    })
  }
}

