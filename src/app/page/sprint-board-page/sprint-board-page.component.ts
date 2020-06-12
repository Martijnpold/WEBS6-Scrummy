import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { Project } from 'src/app/model/project';
import { Sprint } from 'src/app/model/sprint';
import { Task } from 'src/app/model/task';
import { ProjectService } from 'src/app/services/project.service';
import { SprintService } from 'src/app/services/sprint.service';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { TaskCreateComponent } from 'src/app/core/task/task-create/task-create.component';

@Component({
  selector: 'app-sprint-board-page',
  templateUrl: './sprint-board-page.component.html',
  styleUrls: ['./sprint-board-page.component.scss']
})
export class SprintBoardPageComponent implements OnInit {
  user$: Observable<ScrummyUser>;
  project$: Observable<Project>;
  sprint$: Observable<Sprint>;
  tasks$: Observable<Task[]>;

  constructor(private projectService: ProjectService, private sprintService: SprintService, private taskService: TaskService, private route: ActivatedRoute, private dialog: MatDialog, private auth: AuthService) { }

  ngOnInit() {
    this.user$ = this.auth.getUser();
    this.project$ = this.projectService.get(this.route.snapshot.paramMap.get('pid'));
    this.sprint$ = this.sprintService.get$(this.project$, this.route.snapshot.paramMap.get('sid'));
    this.tasks$ = this.taskService.getTasksOfSprint$(this.project$, this.sprint$);
  }
}
