import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/model/project';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { ScrummyUserService } from 'src/app/services/scrummy-user.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project$: Observable<Project>;
  members$: Observable<ScrummyUser[]>;

  constructor(private projectService: ProjectService, private suserService: ScrummyUserService, @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit() {
    this.project$ = this.projectService.get(this.data.project_id);
    this.members$ = this.suserService.getMembers$(this.project$);
  }
}
