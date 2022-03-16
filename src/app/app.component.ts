import { Component, OnInit } from '@angular/core';
import { MarvelapiService } from './marvelapi.service';
import { FormControl } from '@angular/forms';
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
//     console.log("App onInIt")
//     this._marvelApiService.getCharacters().subscribe(
//       a => {
// console.log("subscribe data",a);
// this.data = a;
// console.log("Data from service",this.data)
//       },
//       error => {  
//         console.error("subscribe error",error.error.message);
//       }
    // )  

    

    // const a = this._marvelApiService.getCharacters().toPromise()
    // .then(res => {
    //   console.log("res", res);
    //   this.data = res;
    //   console.log("Data from service",this.data)
    // }).catch(err => {
    //   console.log("err",err);
    // })
    // console.log(a);
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
