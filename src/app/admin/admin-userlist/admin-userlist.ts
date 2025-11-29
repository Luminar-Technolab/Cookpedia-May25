import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-userlist',
  standalone: false,
  templateUrl: './admin-userlist.html',
  styleUrl: './admin-userlist.css',
})
export class AdminUserlist {
  api = inject(ApiService)
  allUsers:any = []

  ngOnInit(){
    this.getUsers()
  }
  
  getUsers(){
    this.api.getAllUsersAPI().subscribe((res:any)=>{
      this.allUsers = res
    })
  }
}
