import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private route : ActivatedRoute, private router : Router) { }

  events: string[] = [];
  opened: boolean = false;
  
  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem("jwtToken");
     this.router.navigate([""]) 
  }

}
