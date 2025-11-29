import { Component ,inject} from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-feedbacklist',
  standalone: false,
  templateUrl: './admin-feedbacklist.html',
  styleUrl: './admin-feedbacklist.css',
})
export class AdminFeedbacklist {
api=inject(ApiService)
  feedbackList:any = []

  ngOnInit(){
    this.getAllFeedbacks()
  }
  
  getAllFeedbacks(){
    this.api.getAllFeedbacksAPI().subscribe((res:any)=>{
      this.feedbackList = res
      
    })
  }

  editStatus(id:string,status:string){
    this.api.updateFeedbackAPI(id,status).subscribe((res:any)=>{
      alert(`Status of feedback ID : ${res._id} Updated successfully!!!`)
      this.getAllFeedbacks()
    })
  }
}
