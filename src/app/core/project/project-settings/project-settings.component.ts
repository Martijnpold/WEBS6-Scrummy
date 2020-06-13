import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnInit, OnDestroy {
  @Input() project$: Observable<Project>;

  edit_subscr: Subscription;
  project_editing: Project;

  constructor(private projectService: ProjectService, private toastr: ToastrService) { }

  ngOnInit() {
    this.edit_subscr = this.project$.subscribe((project => {
      this.project_editing = project;
    }))
  }

  ngOnDestroy() {
    this.edit_subscr.unsubscribe();
  }

  save() {
    this.projectService.update(this.project_editing);
    this.toastr.success('Project settings have been saved');
  }

  archive(project: Project, archived: boolean) {
    project.archived = archived;
    this.projectService.update(project);

    if (archived) {
      this.toastr.success('Project has been archived');
    } else {
      this.toastr.success('Project has been unarchived');
    }
  }
}
