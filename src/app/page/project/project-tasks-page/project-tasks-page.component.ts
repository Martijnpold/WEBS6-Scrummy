import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { TaskCreateComponent } from 'src/app/core/task/task-create/task-create.component';

@Component({
  selector: 'app-project-tasks-page',
  templateUrl: './project-tasks-page.component.html',
  styleUrls: ['./project-tasks-page.component.scss']
})
export class ProjectTasksPageComponent implements OnInit {
  user$: Observable<ScrummyUser>;
  project$: Observable<Project>;
  tasks$: Observable<Task[]>;

  constructor(private projectService: ProjectService, private taskService: TaskService, private route: ActivatedRoute, private dialog: MatDialog, private auth: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.auth.getUser();
    this.project$ = this.projectService.get(this.route.snapshot.paramMap.get('pid'));
    this.tasks$ = this.taskService.getTasks$(this.project$);
  }

  openCreateDialog() {
    this.dialog.open(TaskCreateComponent, { data: { 'project': this.project$ } });
  }
}
