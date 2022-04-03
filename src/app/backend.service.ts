import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  URI:string="http://localhost:5000"

  constructor(private http:HttpClient) {

   }

   login(email:any, password:any){
     console.log(email, password)
     let response = this.http.post(this.URI+'/login',{email:email, password: password},{observe: 'response'})
     return response;
   }
   register(email:any, password:any){
     let response = this.http.post(this.URI+'/register',{email:email, password: password},{observe: 'response'})
     return response;
   }
}
