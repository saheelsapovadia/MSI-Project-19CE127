import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(private _backendAPI: BackendService, private route : ActivatedRoute, private router : Router, private _snackBar: MatSnackBar){

  }

  ngOnInit(): void {
    if(localStorage.getItem('jwtToken')){
      this.router.navigate(['/dashboard'])
    }
  }
  // test(){
  //   console.log("submiting..")
  //   console.log(this.username," ", this.password)
  // }

  login(){
    this._backendAPI.login(this.email?.value, this.password?.value).subscribe((data:any) => {
      console.log(data.body)
      if(data.body){
        
        let token = data.body.token;
        console.log("token", token)
        if(token == null){
          console.log("opening snackbaar...")
          this._snackBar.open(data.body.message, "Cancel", {
  duration: 2500
});
        }else{
          localStorage.setItem("jwtToken", token);
          token ? this.router.navigate(['/dashboard']) : null;
        }
      }else alert(data.body)
    }, error => {
      alert("Couldn't connect to the server, check you internet connection")
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
