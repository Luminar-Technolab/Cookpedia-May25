import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api-service';
import { Footer } from "../footer/footer";
import { Header } from '../header/header';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-save-recipes',
  imports: [Footer, Header, RouterLink],
  templateUrl: './save-recipes.html',
  styleUrl: './save-recipes.css',
})
export class SaveRecipes {

  recipes:any =[]
  api=inject(ApiService)

  ngOnInit(){
    this.getAllSavedRecipe()
  }

  getAllSavedRecipe(){
    this.api.getSavedRecipeAPI().subscribe((res:any)=>{
      this.recipes = res
      console.log(this.recipes);      
    })
  }

  deleteRecipe(id:any){
    this.api.removeSavedRecipeAPI(id).subscribe((res:any)=>{
      this.getAllSavedRecipe()
    })
  }

}
