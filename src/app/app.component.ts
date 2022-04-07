import { Component, OnInit } from '@angular/core';
import { BackendService } from './backend.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-api';
  data:any = {}
  username =''
  password=''
  constructor(private _backendAPI: BackendService){

  }

  ngOnInit(): void {

  }


  test(){
    console.log("submiting..")
    console.log(this.username," ", this.password)
  }

  login(){
    this._backendAPI.login(this.username, this.password).subscribe((data:any) => {
      alert(data.status);
      console.log(data.body)
      if(data.body){
        let token = data.body.token;
        console.log("toekn", token)
      }
    }, error => {
      console.log(error)
    })
  }
  register(){
    this._backendAPI.register(this.username, this.password).subscribe(data => {
      alert(data.status);
      console.log(data)
    }, error => {
      console.log(error)
    })
  }
}
