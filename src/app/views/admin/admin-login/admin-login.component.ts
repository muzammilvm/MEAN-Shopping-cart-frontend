import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/api-services.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{
  errorMsg: string = ''
  successMsg: boolean = false
  username:string=''
  admin:string='true'


  loginForm = this.fb.group({
    email: ["", Validators.compose([Validators.required, Validators.email])],
    password: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
  })


  constructor(private fb: FormBuilder, private api: ApiServicesService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('admin')) {
      this.router.navigateByUrl('/admin')
    }  }

  login() {
    if (this.loginForm.valid) {
      let email = this.loginForm.value.email
      let password = this.loginForm.value.password
      console.log(email, password);

      this.api.login(email, password).subscribe((result: any) => {
        console.log(result);
        // alert(result.message)

        this.successMsg = true

        // setting username into local storage
        this.username=result.name
        localStorage.setItem('adminName',this.username)
        

        // current email
        localStorage.setItem('adminEmail',result.email)

        // mongodb user id
        localStorage.setItem('adminId',result.id)

        // store token
        localStorage.setItem('adminToken',result.token)

        // admin
        localStorage.setItem('admin',this.admin)

        //navigate to admin home page by setting 2 seconds delay
        setTimeout(() => {
          this.router.navigateByUrl('/admin')
        }, 2000)

      },
        // using another callback for catching error
        (result: any) => {
          this.errorMsg = result.error.message
          alert(this.errorMsg)
          setTimeout(() => {
            this.errorMsg = ''
            this.loginForm.reset()
          }, 1500);
        })

    } else {
      alert('Invalid Form')
    }


  }

}

