import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminRecipelist } from './admin-recipelist/admin-recipelist';
import { AdminDownloadlist } from './admin-downloadlist/admin-downloadlist';
import { AdminUserlist } from './admin-userlist/admin-userlist';
import { AdminFeedbacklist } from './admin-feedbacklist/admin-feedbacklist';
import { AdminAddRecipe } from './admin-add-recipe/admin-add-recipe';

const routes: Routes = [
  //loaclhost:4200/admin
  {
    path:"", component:AdminDashboard,title:'Dashboard - Admin'
  },
  {
    path:"recipe-list",component:AdminRecipelist,title:'Recipes - Admin'
  },
  {
    path:"download-list",component:AdminDownloadlist,title:'Downloads - Admin'
  },
  {
    path:"user-list",component:AdminUserlist,title:'Users - Admin'
  },
  {
    path:"feedback-list",component:AdminFeedbacklist,title:'Feedbacks - Admin'
  },
  {
    path:"recipe/add",component:AdminAddRecipe,title:'Add Recipe - Admin'
  },
  {
    path:"recipes/:id/edit",component:AdminAddRecipe,title:'Edit Recipe - Admin'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
