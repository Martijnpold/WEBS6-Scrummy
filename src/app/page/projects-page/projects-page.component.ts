import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectCreateComponent } from 'src/app/core/project/project-create/project-create.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {

  constructor(private dialog: MatDialog, public auth: AuthService) { }

  ngOnInit(): void {
  }

  openCreateDialog() {
    this.dialog.open(ProjectCreateComponent);
  }
}
