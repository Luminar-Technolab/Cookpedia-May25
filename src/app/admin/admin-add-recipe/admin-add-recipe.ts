import { Component, inject } from '@angular/core';
import { RecipeModel } from '../model/recipeModel';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-add-recipe',
  standalone: false,
  templateUrl: './admin-add-recipe.html',
  styleUrl: './admin-add-recipe.css',
})
export class AdminAddRecipe {

  api=inject(ApiService)
  recipeDetails:RecipeModel={}
  ingrdientsArray:any = []
  instructionArray:any = []
  mealArray:any = []
  selectedMealTypeArray:any = []

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      const dummyMeal = res.map((item:any)=>item.mealType)    
      // console.log(dummyMeal.flat(Infinity));
      dummyMeal.flat(Infinity).forEach((item:any)=>{
        !this.mealArray.includes(item) && this.mealArray.push(item)
      })
    console.log(this.mealArray);
    })
  }

  addIngredients(ingredientsInput:any){
    if(ingredientsInput.value){
      this.ingrdientsArray.push(ingredientsInput.value)
     ingredientsInput.value = ""      
    }
  }
  removeIngedient(value:string){
    this.ingrdientsArray = this.ingrdientsArray.filter((item:string)=>item!=value)
  }

  addInstructions(instructionInput:any){
    if(instructionInput.value){
      this.instructionArray.push(instructionInput.value)
     instructionInput.value = ""      
    }
  }
  removeInstruction(value:string){
    this.instructionArray = this.instructionArray.filter((item:string)=>item!=value)
  }

  chooseMeal(mealCheckEvent:any){
    // console.log(mealCheckEvent.target);
    
    if(mealCheckEvent.target.checked){
      !this.selectedMealTypeArray.includes(mealCheckEvent.target.name) && this.selectedMealTypeArray.push(mealCheckEvent.target.name)
    }else{
      this.selectedMealTypeArray = this.selectedMealTypeArray.filter((item:string)=>item!=mealCheckEvent.target.name)
    }
  }
}
