import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent {
  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
    email: ["", Validators.compose([Validators.required, Validators.email])],
    password: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
  })


  constructor(private fb: FormBuilder, private api: ApiServicesService, private router: Router) { }

  
  signup() {
    if (this.signupForm.valid) {
      let name = this.signupForm.value.name
      let email = this.signupForm.value.email
      let password = this.signupForm.value.password
      this.api.signup(name, email, password).subscribe((result: any) => {
        console.log(result);
        alert(result.message)

        //navigate to login
       this.router.navigateByUrl('/user-login')
      },
        // using another callback for catching error
        (result: any) => {
          alert(result.error.message)
        })

      console.log(name, email, password);

    } else {
      alert('Invalid Form')
    }
  }
}
