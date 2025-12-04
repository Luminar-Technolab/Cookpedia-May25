import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Recipes } from './recipes/recipes';
import { Register } from './register/register';
import { SaveRecipes } from './save-recipes/save-recipes';
import { ViewRecipe } from './view-recipe/view-recipe';
import { Pnf } from './pnf/pnf';
import { routeGuard } from './guards/route-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
    //lazy loaded module path
    {
        path:'admin',canActivate:[adminGuard], loadChildren:()=>import('./admin/admin-module').then(module=>module.AdminModule)
    },
    //http://localhost:4200/
    {
        path:"", component:Home, title:'Cookpedia - Home'
    },
    //http://localhost:4200/about
    {
        path:"about", component:About, title:'Cookpedia - About'
    },
    //http://localhost:4200/contact
    {
        path:"contact", component:Contact, title:'Cookpedia - Contact'
    },
    //http://localhost:4200/login
    {
        path:"login", component:Login, title:'Cookpedia - Login'
    },
    //http://localhost:4200/profile
    {
        path:"profile",canActivate:[routeGuard], component:Profile, title:'Cookpedia - Profile'
    },
    //http://localhost:4200/recipes
    {
        path:"recipes", component:Recipes, title:'Cookpedia - Recipes'
    },
    //http://localhost:4200/register
    {
        path:"register", component:Register, title:'Cookpedia - Register'
    },
    //http://localhost:4200/recipe/save
    {
        path:"recipe/save",canActivate:[routeGuard], component:SaveRecipes, title:'Cookpedia - User Recipe Collection'
    },
    //http://localhost:4200/recipes/id/view
    {
        path:"recipes/:id/view",canActivate:[routeGuard], component:ViewRecipe, title:'Cookpedia - A Recipe'
    },
    //http://localhost:4200/ - age not found
    {
        path:"**", component:Pnf, title:'404 - Page Not Found!'
    },
];
