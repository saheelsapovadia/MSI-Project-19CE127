import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private route : ActivatedRoute, private router : Router) { }

  events: string[] = [];
  opened: boolean = false;
  token:any;
  helper:any;
  decodedToken:any;
  username:any;
  currentPage:any = 'Dashboard'
  ngOnInit(): void {
    console.log("dashboard")
  this.token = localStorage.getItem("jwtToken")
    this.helper = new JwtHelperService();
    this.decodedToken = this.helper.decodeToken(this.token);
    this.username = this.decodedToken.user.split(' ')[0];
    console.log(this.decodedToken)
    // expirationDate:any = this.helper.getTokenExpirationDate(myRawToken);
    // isExpired:any = this.helper.isTokenExpired(myRawToken);
  }

  logout(){
    localStorage.removeItem("jwtToken");
     this.router.navigate([""]) 
  }
  navigate(route:String, sidenav:any){
    this.currentPage = route;
    sidenav.toggle()
  console.log("navigating to",route)
  
    this.router.navigate(["dashboard/"+route])
  }
  cardClick(route:String,sidenav:any){
    this.currentPage = route;
    if(route == 'Dashboard'){
      sidenav.toggle()
      this.router.navigate(["dashboard/"])
    } 
    else this.router.navigate(["dashboard/"+route])
  }

}
function myRawToken(myRawToken: any): any {
  throw new Error('Function not implemented.');
}

