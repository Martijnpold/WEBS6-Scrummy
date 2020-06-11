import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './core/project/project-list/project-list.component';
import { ProjectItemComponent } from './core/project/project-item/project-item.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { ProjectCreateComponent } from './core/project/project-create/project-create.component';
import { ProjectsPageComponent } from './page/projects-page/projects-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { RegisterPageComponent } from './page/register-page/register-page.component';
import { ProjectDetailComponent } from './core/project/project-detail/project-detail.component';
import { ProjectMenuComponent } from './core/project/project-menu/project-menu.component';
import { ProjectTasksPageComponent } from './page/project/project-tasks-page/project-tasks-page.component';
import { TaskCreateComponent } from './core/task/task-create/task-create.component';
import { TaskListComponent } from './core/task/task-list/task-list.component';
import { ProjectMembersPageComponent } from './page/project/project-members-page/project-members-page.component';
import { ProjectSettingsPageComponent } from './page/project/project-settings-page/project-settings-page.component';
import { SprintListComponent } from './core/sprint/sprint-list/sprint-list.component';
import { SprintItemComponent } from './core/sprint/sprint-item/sprint-item.component';
import { ProjectSprintsPageComponent } from './page/project/project-sprints-page/project-sprints-page.component';
import { SprintCreateComponent } from './core/sprint/sprint-create/sprint-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ProjectListComponent,
    ProjectItemComponent,
    LoginComponent,
    RegisterComponent,
    ProjectCreateComponent,
    ProjectsPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProjectDetailComponent,
    ProjectMenuComponent,
    ProjectTasksPageComponent,
    TaskCreateComponent,
    TaskListComponent,
    ProjectMembersPageComponent,
    ProjectSettingsPageComponent,
    SprintListComponent,
    SprintItemComponent,
    ProjectSprintsPageComponent,
    SprintCreateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppMaterialModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
