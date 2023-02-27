import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit{

  adminName:string=''
  constructor(private router: Router){}

  ngOnInit() {
    // if (!localStorage.getItem('token')) {
    //   alert('Please Login')
    //   this.router.navigateByUrl('')
    // }

    if (localStorage.getItem('adminName')) {
      this.adminName = localStorage.getItem('adminName') || ''
    }
  }

  logout(){
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminName')
    localStorage.removeItem('adminEmail')
    localStorage.removeItem('adminId')
    localStorage.removeItem('admin')

    // this.logoutDiv = true

    // navigate to login by setting timeout
    setTimeout(() => {
      this.router.navigateByUrl('/admin-login')
    //  this.logoutDiv = false
    }, 1000); 
  }

}
