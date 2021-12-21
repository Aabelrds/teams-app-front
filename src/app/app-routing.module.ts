import { TeamsComponent } from './teams/teams.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './usuarios/login/login.component';

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
    path:'teams/new',
    component: FormComponent
  },
  {
    path:'teams/update/:id',
    component: FormComponent
  },
  {
    path:'login',
    component: LoginComponent
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
