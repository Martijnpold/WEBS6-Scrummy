import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectCreateComponent } from 'src/app/core/project/project-create/project-create.component';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {
  projects$: Observable<Project[]>;
  user$: Observable<ScrummyUser>;

  constructor(private dialog: MatDialog, private projectService: ProjectService, private auth: AuthService) { }

  ngOnInit(): void {
    this.projects$ = this.projectService.getAll();
    this.user$ = this.auth.getUser();
  }

  openCreateDialog() {
    this.dialog.open(ProjectCreateComponent);
  }
}
