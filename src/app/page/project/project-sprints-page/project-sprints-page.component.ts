import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SprintService } from 'src/app/services/sprint.service';
import { Sprint } from 'src/app/model/sprint';
import { MatDialog } from '@angular/material/dialog';
import { SprintCreateComponent } from 'src/app/core/sprint/sprint-create/sprint-create.component';

@Component({
  selector: 'app-project-sprints-page',
  templateUrl: './project-sprints-page.component.html',
  styleUrls: ['./project-sprints-page.component.scss']
})
export class ProjectSprintsPageComponent implements OnInit {
  user$: Observable<ScrummyUser>;
  project$: Observable<Project>;
  sprints$: Observable<Sprint[]>;

  constructor(private projectService: ProjectService, private sprintService: SprintService, private route: ActivatedRoute, private auth: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.user$ = this.auth.getUser();
    this.project$ = this.projectService.get(this.route.snapshot.paramMap.get('pid'));
    this.sprints$ = this.sprintService.getSprints$(this.project$);
  }

  openCreateDialog() {
    this.dialog.open(SprintCreateComponent, { data: { 'project': this.project$ } });
  }
}
