import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-recipes',
  imports: [Header, Footer],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {

}
