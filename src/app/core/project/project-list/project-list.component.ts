import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../../../model/project';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(private projectService: ProjectService, public auth: AuthService) { }

  ngOnInit() {
    this.projects$ = this.projectService.getAll();
  }
}
