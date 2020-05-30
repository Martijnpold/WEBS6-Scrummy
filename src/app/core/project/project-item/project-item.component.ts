import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../model/project';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  @Input() project: Project;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDetailDialog() {
    this.dialog.open(ProjectDetailComponent, {
      data: {
        project_id: this.project.id
      }
    });
  }
}
