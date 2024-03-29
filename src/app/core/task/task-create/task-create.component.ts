import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectCreateComponent } from '../../project/project-create/project-create.component';
import { Project } from 'src/app/model/project';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  @Input() project$: Observable<Project>;
  createForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    'story_points': new FormControl('', [Validators.required]),
  });
  user$: Observable<ScrummyUser>;

  constructor(private auth: AuthService, private taskService: TaskService, private dialogRef: MatDialogRef<ProjectCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    if (description.hasError('minlength')) return 'Descriptions should be at least 1 character long';
    if (description.hasError('maxlength')) return 'Descriptions should be at max 100 characters long';
    return '';
  }

  getStoryPointsErrorMessage() {
    const storyPoints = this.createForm.get('story_points');
    if (storyPoints.hasError('required')) return 'You must enter a value';
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
      task.story_points = Number(this.createForm.get('story_points').value);
      task.creator = user.id;
      this.taskService.createTask(project, task);
      this.dialogRef.close();
    }
  }
}
