import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-tasks-page',
  templateUrl: './project-tasks-page.component.html',
  styleUrls: ['./project-tasks-page.component.scss']
})
export class ProjectTasksPageComponent implements OnInit {
  project$: Observable<Project>;
  showFiller = false;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.project$ = this.projectService.get(this.route.snapshot.paramMap.get('id'));
  }
}
