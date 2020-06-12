import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsPageComponent } from './page/projects-page/projects-page.component';
import { RegisterPageComponent } from './page/register-page/register-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { ProjectTasksPageComponent } from './page/project/project-tasks-page/project-tasks-page.component';
import { ProjectMembersPageComponent } from './page/project/project-members-page/project-members-page.component';
import { ProjectSettingsPageComponent } from './page/project/project-settings-page/project-settings-page.component';
import { ProjectSprintsPageComponent } from './page/project/project-sprints-page/project-sprints-page.component';
import { SprintBoardPageComponent } from './page/sprint-board-page/sprint-board-page.component';


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
    path: 'projects/:pid',
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
      },
      {
        path: 'tasks',
        component: ProjectTasksPageComponent
      },
      {
        path: 'members',
        component: ProjectMembersPageComponent
      },
      {
        path: 'settings',
        component: ProjectSettingsPageComponent,
      },
      {
        path: 'sprints',
        component: ProjectSprintsPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'sprints/:sid',
        component: SprintBoardPageComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
