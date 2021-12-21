import { TeamsComponent } from './teams/teams.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/teams',
    pathMatch:'full',
  },
  {
    path:'teams',
    component: TeamsComponent
  },
  {
    path: '**',
    redirectTo:''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
