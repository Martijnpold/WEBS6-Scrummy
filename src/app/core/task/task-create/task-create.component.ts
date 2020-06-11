import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectCreateComponent } from '../../project/project-create/project-create.component';
import { Project } from 'src/app/model/project';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/task';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  @Input() project$: Observable<Project>;
  createForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]),
  });
  formSubscription: Subscription;
  user$: Observable<ScrummyUser>;

  constructor(private auth: AuthService, private projectService: ProjectService, private taskService: TaskService, private dialogRef: MatDialogRef<ProjectCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.user$ = this.auth.getUser();
    this.project$ = this.data.project;
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

  create(user: ScrummyUser, project: Project) {
    if (this.createForm.valid) {
      const task = new Task();
      task.name = this.createForm.get('name').value;
      task.description = this.createForm.get('description').value;
      task.creator = user.id;
      this.taskService.createTask(project, task);
      this.dialogRef.close();
    }
  }
}
