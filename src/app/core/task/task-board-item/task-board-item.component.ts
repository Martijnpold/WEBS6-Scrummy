import { Component, OnInit, Inject, Input } from '@angular/core';
import { Task } from 'src/app/model/task';
import { Observable, of } from 'rxjs';
import { Project } from 'src/app/model/project';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScrummyUserService } from 'src/app/services/scrummy-user.service';

@Component({
  selector: 'app-task-board-item',
  templateUrl: './task-board-item.component.html',
  styleUrls: ['./task-board-item.component.scss']
})
export class TaskBoardItemComponent implements OnInit {
  @Input() project$: Observable<Project>;
  @Input() task: Task;
  assignee$: Observable<ScrummyUser>;

  constructor(private suserService: ScrummyUserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.task.assignee) {
      this.assignee$ = this.suserService.get(this.task.assignee);
    } else {
      this.assignee$ = of(undefined);
    }
  }

  details() {
    this.dialog.open(TaskEditComponent, {
      data: {
        project$: this.project$,
        task_id: this.task.id
      }
    });
  }
}
