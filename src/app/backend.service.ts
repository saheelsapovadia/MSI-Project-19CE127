import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  URI:string="http://localhost:5000"

  constructor(private http:HttpClient) {

   }

   login(username:any, password:any){
     let response = this.http.post(this.URI+'/login',{username:username, password: password},{observe: 'response'})
     return response;
   }
   register(username:any, password:any){
     let response = this.http.post(this.URI+'/register',{username:username, password: password},{observe: 'response'})
     return response;
   }
}
