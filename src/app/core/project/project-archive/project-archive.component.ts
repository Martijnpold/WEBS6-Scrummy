import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-archive',
  templateUrl: './project-archive.component.html',
  styleUrls: ['./project-archive.component.scss']
})
export class ProjectArchiveComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projects$ = this.projectService.getAll(true);
  }

  unarchive(project: Project) {
    project.archived = false;
    this.projectService.update(project);
  }
}
