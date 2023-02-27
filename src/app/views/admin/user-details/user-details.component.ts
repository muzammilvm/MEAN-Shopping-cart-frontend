import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  users:any

  constructor(private api: ApiServicesService, private router: Router) { }


  ngOnInit() {
    if (localStorage.getItem('admin')) {
      this.api.getUsreDetails().subscribe((result:any)=>{
        console.log(result);
        this.users=result.users
        
      })
    } else {
      alert('Please Login')
      this.router.navigateByUrl('/admin-login')
    }
  }

}
