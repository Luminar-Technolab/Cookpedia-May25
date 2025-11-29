import { Component,inject } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-recipelist',
  standalone: false,
  templateUrl: './admin-recipelist.html',
  styleUrl: './admin-recipelist.css',
})
export class AdminRecipelist {

  api = inject(ApiService)
  allRecipes:any =[]
  searchKey:string = ""

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.allRecipes  = res
      console.log(this.allRecipes);
    })
  }
}
