import { Component, inject } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { ApiService } from '../services/api-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  imports: [Header, Footer],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {
  allRecipes:any = []
  dummyAllRecipe:any =[]
  cuisineArray:any = []
  mealTypeArray:any=[]

  api=inject(ApiService)
  router=inject(Router)

  ngOnInit(){
    this.getallRecipes()
  }
  getallRecipes(){
    this.api.getAllRecipesAPI().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.allRecipes = res
        this.dummyAllRecipe = res
        this.allRecipes.forEach((item:any)=>{
          !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
        })
        // console.log(this.cuisineArray);
        const dummyMealArray = this.allRecipes.map((item:any)=>item.mealType).flat(Infinity)
        dummyMealArray.forEach((item:any)=>{
          !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
        })
        // console.log(this.mealTypeArray);
        
      }
    })
  }

  filterRecipe(key:string,value:string){
    this.allRecipes = this.dummyAllRecipe.filter((item:any)=>item[key]==value)
  }

  //navigate view
  navigateView(recipeId:string){
    if(sessionStorage.getItem("token")){
      this.router.navigateByUrl(`/recipes/${recipeId}/view`)
    }else{
      alert("Please Login to get full access to our Recipe Collection!!!")
    }
  }
}
