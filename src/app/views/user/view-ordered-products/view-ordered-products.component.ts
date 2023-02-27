import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-view-ordered-products',
  templateUrl: './view-ordered-products.component.html',
  styleUrls: ['./view-ordered-products.component.css']
})
export class ViewOrderedProductsComponent implements OnInit{

  orderItems:any
  
  constructor( private api: ApiServicesService, private router: Router,private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userId = localStorage.getItem('userId')
      this.activatedroute.params.subscribe((id:any)=>{
      let orderId=id.orderId
      console.log(orderId);
      this.api.getOrderProducts(orderId).subscribe((result:any)=>{
        console.log(result);
        this.orderItems=result.orderItems
      })
      })
      
    }else{
      alert('please login')
      this.router.navigateByUrl('')
    }

  }
}
