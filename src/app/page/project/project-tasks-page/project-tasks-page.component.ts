import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { TaskCreateComponent } from 'src/app/core/task/task-create/task-create.component';
import { Sprint } from 'src/app/model/sprint';
import { SprintService } from 'src/app/services/sprint.service';
import { TaskArchiveComponent } from 'src/app/core/task/task-archive/task-archive.component';

@Component({
  selector: 'app-project-tasks-page',
  templateUrl: './project-tasks-page.component.html',
  styleUrls: ['./project-tasks-page.component.scss']
})
export class ProjectTasksPageComponent implements OnInit {
  user$: Observable<ScrummyUser>;
  project$: Observable<Project>;
  active_sprint$: Observable<Sprint>;
  tasks$: Observable<Task[]>;

  constructor(private projectService: ProjectService, private sprintService: SprintService, private taskService: TaskService, private route: ActivatedRoute, private dialog: MatDialog, private auth: AuthService) { }

  ngOnInit() {
    this.user$ = this.auth.getUser();
    this.project$ = this.projectService.get(this.route.snapshot.paramMap.get('pid'));
    this.active_sprint$ = this.sprintService.getActiveSprint$(this.project$);
    this.tasks$ = this.taskService.getTasks$(this.project$);
  }

  openCreateDialog() {
    this.dialog.open(TaskCreateComponent, { data: { 'project': this.project$ } });
  }

  openArchiveDialog(project: Project) {
    this.dialog.open(TaskArchiveComponent, {
      data: {
        project_id: project.id
      }
    });
  }
}
