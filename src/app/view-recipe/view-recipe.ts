import { Component, inject } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from '../footer/footer';
import { ApiService } from '../services/api-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-recipe',
  imports: [Header,Footer],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css',
})
export class ViewRecipe {

  recipeId:any = ""
  recipe:any = {}
  relatedRecipes:any = []

  api=inject(ApiService)
  route = inject(ActivatedRoute)

  ngOnInit(){
  //  get dynamic id from url
    this.route.params.subscribe((res:any)=>{
      this.recipeId = res.id
      // console.log(this.recipeId);
      this.getRecipeDetails(this.recipeId)
    })
  }

  getRecipeDetails(id:any){
    this.api.viewRecipeAPI(id).subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.recipe = res
        console.log(this.recipe);   
        this.getRelatedRecipes(res.cuisine)     
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }

  //get related recips
  getRelatedRecipes(cuisine:any){
    this.api.relatedRecipeAPI(cuisine).subscribe((res:any)=>{
      if(res.length>1){
        this.relatedRecipes = res.filter((item:any)=>item.name!=this.recipe.name)
        console.log(this.relatedRecipes);
      }else{
        this.relatedRecipes = []
      }
    })
  }
}


