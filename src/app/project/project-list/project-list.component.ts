import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects$: Observable<any>;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projects$ = this.projectService.getAll();
    console.log(this.projectService.getAll());
    this.projects$.subscribe((a) => {
      console.log(a);
    })
  }

}
