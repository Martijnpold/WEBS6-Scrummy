import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Project } from 'src/app/model/project';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { SprintService } from 'src/app/services/sprint.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectCreateComponent } from '../../project/project-create/project-create.component';
import { Sprint } from 'src/app/model/sprint';

@Component({
  selector: 'app-sprint-create',
  templateUrl: './sprint-create.component.html',
  styleUrls: ['./sprint-create.component.scss']
})
export class SprintCreateComponent implements OnInit {
  @Input() project$: Observable<Project>;
  createForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'startDate': new FormControl('', [Validators.required]),
    'endDate': new FormControl('', [Validators.required]),
  });
  formSubscription: Subscription;
  user$: Observable<ScrummyUser>;

  constructor(private auth: AuthService, private sprintService: SprintService, private dialogRef: MatDialogRef<ProjectCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.user$ = this.auth.getUser();
    this.project$ = this.data.project;
  }

  getNameErrorMessage() {
    const name = this.createForm.get('name');
    if (name.hasError('required')) return 'You must enter a date';
    return '';
  }

  getStartDateErrorMessage() {
    const start = this.createForm.get('startDate');
    if (start.hasError('required')) return 'You must enter a date';
    if (start.hasError('matDatepickerMax')) return 'The start date must be before the end date';
    return '';
  }

  getEndDateErrorMessage() {
    const end = this.createForm.get('endDate');
    if (end.hasError('required')) return 'You must enter a value';
    if (end.hasError('matDatepickerMin')) return 'The end date must be after the start date';
    return '';
  }

  submitEnter($event: KeyboardEvent) {
    $event.stopPropagation();
  }

  create(user: ScrummyUser, project: Project) {
    if (this.createForm.valid) {
      const sprint = new Sprint();
      sprint.name = this.createForm.get('name').value;
      sprint.startDate = this.createForm.get('startDate').value;
      sprint.endDate = this.createForm.get('endDate').value;
      this.sprintService.create(project, sprint);
      this.dialogRef.close();
    }
  }
}
