import { Component, inject, signal } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [Header, Footer,FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  username:string = ""
  password:string =""
  confirmPassword:string = ""
  userId:string = ""
  // profile:string = "https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg?w=2000"
  profile = signal("https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg?w=2000")
  downloadList:any = []
  api=inject(ApiService)
  router = inject(Router)
  constructor(){
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user") || "")
      this.username = user.username
      this.userId = user._id
      if(user.profile) { 
        // this.profile = user.profile
        //update signal using set method
        this.profile.set(user.profile)
      }
    }
  }

  ngOnInit(){
    this.getDownloadList()
  }

  getDownloadList(){
    this.api.getUserRecipeDownloadListAPI().subscribe((res:any)=>{
      this.downloadList = res
      console.log(this.downloadList);
      
    })
  }

  getFile(event:any){
    let uploadFile = event.target.files[0]
    // console.log(uploadFile);
    
    //convert to image url
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any) =>{
      this.profile.set(event.target.result)
      // console.log(this.profile);
      
    }
  }

  editProfile(){
    if(this.username){
      if(this.password != this.confirmPassword){
             alert("Password & confirm password must be same!!!!")
      }else{
      this.api.updateUserAPI({username:this.username,password:this.password,profile:this.profile(),id:this.userId}).subscribe((res:any)=>{
          sessionStorage.setItem("user",JSON.stringify(res))
          alert("Profile updated successfully")
          if(this.password!="") {
            this.router.navigateByUrl('/login')
          }
        })
      }
    }else{
      alert("Please fill the form completely!!!")
    }
  }

}
