import { Component, inject, Input } from '@angular/core';
import { RecipeModel } from '../model/recipeModel';
import { ApiService } from '../../services/api-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-recipe',
  standalone: false,
  templateUrl: './admin-add-recipe.html',
  styleUrl: './admin-add-recipe.css',
})
export class AdminAddRecipe {

  route=inject(ActivatedRoute)
  recipeId:string = ""
  // @Input() id !:string
  api=inject(ApiService)
  recipeDetails:RecipeModel={}
  ingrdientsArray:any = []
  instructionArray:any = []
  mealArray:any = []
  selectedMealTypeArray:any = []
  router= inject(Router)

  constructor(){
    this.route.params.subscribe((res:any)=>{
      // console.log(res);
      this.recipeId = res.id
    })
  }

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      if(this.recipeId){
        this.recipeDetails = res.find((item:any)=>item._id==this.recipeId)
        this.instructionArray = this.recipeDetails.instructions
        this.ingrdientsArray = this.recipeDetails.ingredients
        this.selectedMealTypeArray = this.recipeDetails.mealType
      }
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

  addRecipe(){
    this.recipeDetails.ingredients = this.ingrdientsArray
    this.recipeDetails.instructions = this.instructionArray
    this.recipeDetails.mealType = this.selectedMealTypeArray
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,image,mealType,cuisine,caloriesPerServing} = this.recipeDetails
    if(name && ingredients && instructions && prepTimeMinutes && cookTimeMinutes && servings && difficulty && image && mealType && cuisine && caloriesPerServing){
      //make api call
      this.api.addRecipeAPI(this.recipeDetails).subscribe({
        next:(res:any)=>{
          alert("New recipe added successfully!!!")
          this.recipeDetails = {}
          this.instructionArray = []
          this.ingrdientsArray = []
          this.selectedMealTypeArray = []
          this.router.navigateByUrl('/admin/recipe-list')
        }
      })
    }else{
      alert("Please fill the form completely!!!")
    }
  }
  removeMealType(meal:string){
    this.selectedMealTypeArray = this.selectedMealTypeArray.filter((item:string)=>item!=meal)
  }

  updateRecipe(){
    this.recipeDetails.ingredients = this.ingrdientsArray
    this.recipeDetails.instructions = this.instructionArray
    this.recipeDetails.mealType = this.selectedMealTypeArray
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,image,mealType,cuisine,caloriesPerServing} = this.recipeDetails
    if(name && ingredients && instructions && prepTimeMinutes && cookTimeMinutes && servings && difficulty && image && mealType && cuisine && caloriesPerServing){
      //make api call
      this.api.editRecipeAPI(this.recipeId,this.recipeDetails).subscribe({
        next:(res:any)=>{
          alert("Recipe updated successfully!!!")
          this.recipeDetails = {}
          this.instructionArray = []
          this.ingrdientsArray = []
          this.selectedMealTypeArray = []
          this.router.navigateByUrl('/admin/recipe-list')
        }
      })
    }else{
      alert("Please fill the form completely!!!")
    }
  }

}
