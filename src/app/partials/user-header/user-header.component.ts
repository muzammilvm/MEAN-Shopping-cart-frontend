import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  username: string = ''
  userId: any = ''
  cartCount: number = 0
  isScrolled:boolean=false
  @Input() count: number = 0;
  @Input() scroll: number = 0;

  constructor(private router: Router, private api: ApiServicesService) { }
  ngOnInit() {
    // if (!localStorage.getItem('token')) {
    //   alert('Please Login')
    //   this.router.navigateByUrl('')
    // }

    if (localStorage.getItem('user')) {
      this.username = localStorage.getItem('userName') || ''
      this.userId = localStorage.getItem('userId')

      this.api.getCartCount(this.userId).subscribe((result: any) => {
        console.log(result);
        this.cartCount = result.cartcount
      })
    }

  }

  ngOnChanges(){
    this.api.getCartCount(this.userId).subscribe((result:any)=>{
      console.log(result);
      console.log('hello');
      
      this.cartCount=result.cartcount
    })

    window.onscroll=()=>{
     this.isScrolled= window.pageYOffset===0?false:true
     console.log('hello');
     
    }
  }

  logout() {
      localStorage.removeItem('userToken')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userId')
    localStorage.removeItem('user')

    // this.logoutDiv = true

    // navigate to login by setting timeout
    setTimeout(() => {
      this.router.navigateByUrl('/user-login')
      //  this.logoutDiv = false
    }, 1000);
  }
}
