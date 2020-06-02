import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectCreateComponent } from 'src/app/core/project/project-create/project-create.component';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ScrummyUser } from 'src/app/model/scrummy-user';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {
  user$: Observable<ScrummyUser>;

  constructor(private dialog: MatDialog, private auth: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.auth.getUser();
  }

  openCreateDialog() {
    this.dialog.open(ProjectCreateComponent);
  }
}
