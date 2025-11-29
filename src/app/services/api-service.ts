import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  loginUsername= signal("")
  http = inject(HttpClient)
  serverURL ="http://localhost:3000"

  constructor(){
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user") || "")
      this.loginUsername.set(user.username)     
    }
  }

  //getallrcipes
  getAllRecipesAPI(){
    return this.http.get(`${this.serverURL}/recipes/all`)
  }
  //register
  registerAPI(reqBody:any){
    return this.http.post(`${this.serverURL}/register`,reqBody)
  }
  //login
  loginAPI(reqBody:any){
    return this.http.post(`${this.serverURL}/login`,reqBody)
  }

  //addfeedback - user/feedback
  addfeedbackAPI(feedback:any){
    return this.http.post(`${this.serverURL}/user/feedback`,feedback)
  }

  //get approve feedback user/feedback/approve
 getApprovedfeedbacksAPI(){
    return this.http.get(`${this.serverURL}/user/feedback/approve`)
  }

  //appendToken : return token append req haeder
  appendToken(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }
  //view recipe
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.serverURL}/recipes/${recipeId}/view`,this.appendToken())
  }

  //related recipe
  relatedRecipeAPI(cuisine:string){
    return this.http.get(`${this.serverURL}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }
  //add to download
  addToDownloadAPI(recipe:any){
    // recipes/:id/download
    return this.http.put(`${this.serverURL}/recipes/${recipe._id}/download`,recipe,this.appendToken())
  }
  //save recipe - post : http://localhost:3000/recipes/691d470ddc7a58ee89c4e83c/save 
  saveRecipeAPI(recipe:any){
    // recipes/:id/download
    return this.http.post(`${this.serverURL}/recipes/${recipe._id}/save`,recipe,this.appendToken())
  }
  //get saved recipes /recipes/saved
  getSavedRecipeAPI(){
    // recipes/:id/download
    return this.http.get(`${this.serverURL}/recipes/saved`,this.appendToken())
  }
  //remove saved recipe - save-recipes/:id/remove
  removeSavedRecipeAPI(recipeId:any){
    // recipes/:id/download
    return this.http.delete(`${this.serverURL}/save-recipes/${recipeId}/remove`,this.appendToken())
  }

  //get user recipe download list - /recipes/user/download
  getUserRecipeDownloadListAPI(){
    // recipes/:id/download
    return this.http.get(`${this.serverURL}/recipes/user/download`,this.appendToken())
  }
  //users/:id/edit
  updateUserAPI(user:any){
       return this.http.post(`${this.serverURL}/users/${user.id}/edit`,user,this.appendToken()) 
  }

  //get all users
  getAllUsersAPI(){
    return this.http.get(`${this.serverURL}/users`,this.appendToken())
  }
  //get all downloads
  getAllDownloadsAPI(){
    return this.http.get(`${this.serverURL}/downloads`,this.appendToken())
  }
  //get all feedback
  getAllFeedbacksAPI(){
    return this.http.get(`${this.serverURL}/feedbacks`,this.appendToken())
  }
//editfeedback
  updateFeedbackAPI(id:string,status:string){
    return this.http.put(`${this.serverURL}/feedbacks/${id}/edit?status=${status}`,{},this.appendToken())
  }



}
