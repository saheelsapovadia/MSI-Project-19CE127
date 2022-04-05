import { Component, OnInit } from '@angular/core';
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

}
function myRawToken(myRawToken: any): any {
  throw new Error('Function not implemented.');
}

