import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/api-services.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  errorMsg: string = ''
  successMsg: boolean = false
  username: string = ''
  user: string = 'true'


  loginForm = this.fb.group({
    email: ["", Validators.compose([Validators.required, Validators.email])],
    password: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
  })


  constructor(private fb: FormBuilder, private api: ApiServicesService, private router: Router) { }

  ngOnInit(){
    // if (localStorage.getItem('user')) {
    //   this.router.navigateByUrl('/')
    // }
  }

  login() {
    if (this.loginForm.valid) {
      let email = this.loginForm.value.email
      let password = this.loginForm.value.password
      console.log(email, password);

      this.api.userLogin(email, password).subscribe((result: any) => {
        console.log(result);
        // alert(result.message)

        this.successMsg = true

        // setting username into local storage
        this.username = result.name
        localStorage.setItem('userName', this.username)


        // current email
        localStorage.setItem('userEmail', result.email)

        // mongodb user id
        localStorage.setItem('userId', result.id)

        // store token
        localStorage.setItem('userToken', result.token)

        // admin
        localStorage.setItem('user', this.user)

        //navigate to admin home page by setting 2 seconds delay
        setTimeout(() => {
          this.router.navigateByUrl('/')
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
