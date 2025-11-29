import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-downloadlist',
  standalone: false,
  templateUrl: './admin-downloadlist.html',
  styleUrl: './admin-downloadlist.css',
})
export class AdminDownloadlist {
  api=inject(ApiService)
  downloadList:any = []

  ngOnInit(){
    this.getAllDownloads()
  }
  
  getAllDownloads(){
    this.api.getAllDownloadsAPI().subscribe((res:any)=>{
      this.downloadList = res
      
    })
  }
}
