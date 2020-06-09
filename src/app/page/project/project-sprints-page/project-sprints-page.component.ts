import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SprintService } from 'src/app/services/sprint.service';
import { Sprint } from 'src/app/model/sprint';

@Component({
  selector: 'app-project-sprints-page',
  templateUrl: './project-sprints-page.component.html',
  styleUrls: ['./project-sprints-page.component.scss']
})
export class ProjectSprintsPageComponent implements OnInit {
  user$: Observable<ScrummyUser>;
  project$: Observable<Project>;

  constructor(private projectService: ProjectService, private sprintService: SprintService, private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.auth.getUser();
    this.project$ = this.projectService.get(this.route.snapshot.paramMap.get('pid'));
  }

  create(project: Project) {
    let sprint = new Sprint();
    sprint.name = 'Test Sprint';
    this.sprintService.create(project, sprint);
  }
}
