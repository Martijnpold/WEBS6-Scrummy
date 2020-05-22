import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/model/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    // this.projectService.getAll().subscribe(all => {
    //   all.forEach(e => {
    //     if(e.name === 'New Project') {
    //       e.name = "New Project Updated";
    //       this.projectService.update(e);
    //     }
    //   });
    // })
    
    // const project = new Project();
    // project.name = "New Project";
    // this.projectService.create(project);
    
    this.router.navigate(['/']);
  }

}
