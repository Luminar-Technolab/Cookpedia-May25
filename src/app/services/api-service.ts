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
  
}
