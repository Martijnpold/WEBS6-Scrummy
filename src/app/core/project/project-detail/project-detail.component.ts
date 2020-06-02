import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/model/project';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { ScrummyUser } from 'src/app/model/scrummy-user';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project$: Observable<Project>;
  members$: Observable<ScrummyUser[]>;

  constructor(public projectService: ProjectService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.project$ = this.projectService.get(this.data.project_id);
    this.project$.subscribe(project => {
      this.members$ = this.projectService.getMembers(project);
    })
  }

  open(project: Project) {
    console.log(`opened ${project}`)
  }
}
