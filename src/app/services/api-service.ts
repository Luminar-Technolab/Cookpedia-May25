import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  http = inject(HttpClient)
  serverURL ="http://localhost:3000"

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
}
