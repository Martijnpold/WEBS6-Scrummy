import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectCreateComponent } from '../../project/project-create/project-create.component';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  createForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]),
  });
  formSubscription: Subscription;
  user$: Observable<ScrummyUser>;

  constructor(private auth: AuthService, private projectService: ProjectService, private dialogRef: MatDialogRef<ProjectCreateComponent>) { }

  ngOnInit(): void {
    this.user$ = this.auth.getUser();
  }

  getNameErrorMessage() {
    const name = this.createForm.get('name');
    if (name.hasError('required')) return 'You must enter a value';
    return '';
  }

  getDescriptionErrorMessage() {
    const description = this.createForm.get('description');
    if (description.hasError('required')) return 'You must enter a value';
    if (description.hasError('minlength')) return 'Descriptions should be at least 20 characters long';
    if (description.hasError('maxlength')) return 'Descriptions should be at max 100 characters long';
    return '';
  }

  submitEnter($event: KeyboardEvent) {
    $event.stopPropagation();
  }

  create(user: ScrummyUser) {
    if (this.createForm.valid) {
      const project = new Project();
      project.name = this.createForm.get('name').value;
      project.description = this.createForm.get('description').value;
      project.members = [user.id]
      this.projectService.create(project);
      this.dialogRef.close();
    }
  }
}
