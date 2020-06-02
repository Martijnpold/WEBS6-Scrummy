import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsPageComponent } from './page/projects-page/projects-page.component';
import { RegisterPageComponent } from './page/register-page/register-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { ProjectTasksPageComponent } from './page/project/project-tasks-page/project-tasks-page.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'projects',
    component: ProjectsPageComponent
  },
  {
    path: 'projects/:id',
    redirectTo: 'projects/:id/tasks',
    pathMatch: 'full'
  },
  {
    path: 'projects/:id/tasks',
    component: ProjectTasksPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
