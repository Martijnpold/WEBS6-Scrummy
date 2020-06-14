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
import { SprintBurndownComponent } from 'src/app/core/sprint/sprint-burndown/sprint-burndown.component';

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
    this.route.params.subscribe(params => {
      this.user$ = this.auth.getUser();
      this.project$ = this.projectService.get(params['pid']);
      this.sprint$ = this.sprintService.get$(this.project$, params['sid']);
      this.tasks$ = this.taskService.getTasksOfSprint$(this.project$, this.sprint$);
    });
  }

  openBurndownDialog() {
    this.dialog.open(SprintBurndownComponent, {
      data: {
        tasks$: this.tasks$,
        sprint$: this.sprint$,
      }
    });
  }
}
