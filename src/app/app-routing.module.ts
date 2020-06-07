import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsPageComponent } from './page/projects-page/projects-page.component';
import { RegisterPageComponent } from './page/register-page/register-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { ProjectTasksPageComponent } from './page/project/project-tasks-page/project-tasks-page.component';
import { ProjectMembersPageComponent } from './page/project/project-members-page/project-members-page.component';
import { ProjectSettingsPageComponent } from './page/project/project-settings-page/project-settings-page.component';


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
  {
    path: 'projects/:id/members',
    component: ProjectMembersPageComponent
  },
  {
    path: 'projects/:id/settings',
    component: ProjectSettingsPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
