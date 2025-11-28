import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  isLoggedin:boolean = false
  loginUsername:string = ""
  router = inject(Router)
  api = inject(ApiService)
  ngOnInit(){
    if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
      this.isLoggedin = true
      // this.loginUsername = JSON.parse(sessionStorage.getItem("user") || "")?.username?.split(" ")[0]
      this.loginUsername = this.api.loginUsername()
    }
  }

  logout(){
    sessionStorage.clear()
    this.isLoggedin = false
    this.loginUsername = ""
    this.router.navigateByUrl("/")
  }

}
