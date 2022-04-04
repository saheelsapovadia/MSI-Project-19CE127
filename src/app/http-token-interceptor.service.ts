import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpTokenInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    let tokenizedReq;
    if(localStorage.getItem('jwtToken') != null) {
      tokenizedReq = req.clone({
        setHeaders: {
           Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        }
      }) 
    }else{
      tokenizedReq = req.clone();
    }

    return next.handle(tokenizedReq)
  }
}
