import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginForm = new FormGroup({
  email : new FormControl('', [Validators.required, Validators.email]),
  password : new FormControl('', Validators.required),
})

get email(){return this.loginForm.get('email')}
get password(){return this.loginForm.get('password')}
  
errorValidation(controlName:string, errorName:string){
  return this.loginForm.controls[controlName].hasError(errorName)
}

title = 'Motorola Project Mapping';
  data:any = {}
  showPassword:boolean = false;
  usernameError = ""
  passwordError = ""

showPasswordToggle(){
  this.showPassword = !this.showPassword
}

  constructor(private _backendAPI: BackendService, private route : ActivatedRoute, private router : Router){

  }

  ngOnInit(): void {
    
  }
  // test(){
  //   console.log("submiting..")
  //   console.log(this.username," ", this.password)
  // }

  login(){
    this._backendAPI.login(this.email, this.password).subscribe((data:any) => {
      console.log(data.body)
      if(data.body){
        let token = data.body.token;
        console.log("token", token)
        localStorage.setItem("jwtToken", token);
        token ? this.router.navigate(['/dashboard']) : null;
      }else alert(data.body)
    }, error => {
      alert("Incorrect Credentials")
      console.log(error)
    })
  }
  register(){
    this._backendAPI.register(this.email, this.password).subscribe(data => {
      alert(data.status);
      console.log(data)
    }, error => {
      console.log(error)
    })
  }

}
