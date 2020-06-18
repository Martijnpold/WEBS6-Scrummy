import { Component, OnInit, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { ScrummyUserService } from 'src/app/services/scrummy-user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/model/task';
import { flatMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from 'src/app/model/project';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  project$: Observable<Project>;
  task$: Observable<Task>;
  members$: Observable<ScrummyUser[]>;
  assignee$: Observable<ScrummyUser>;

  createForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    'story_points': new FormControl('', [Validators.required]),
    'assignee': new FormControl(''),
  });

  constructor(private suserService: ScrummyUserService, private taskService: TaskService, @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<TaskEditComponent>) {
  }

  ngOnInit() {
    this.project$ = this.data.project$;
    this.task$ = this.taskService.get$(this.project$, this.data.task_id);
    this.members$ = this.suserService.getMembers$(this.project$);
    this.assignee$ = this.task$.pipe(flatMap(task => {
      if (task.assignee) {
        return this.suserService.get(task.assignee);
      }
      return of(undefined);
    }));
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

  save(project: Project, task: Task) {
    if (this.createForm.valid) {
      this.taskService.updateTask(project, task);
      this.dialogRef.close();
    }
  }
}
