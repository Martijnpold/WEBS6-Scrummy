import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardComponent } from './task-board.component';
import { of } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/task';
import { TaskStatus } from 'src/app/model/task-status.enum';
import { MatDialog } from '@angular/material/dialog';

const taskMockService = {
  getTasksOfSprint$: function (a, b) {
    return of([{}]);
  }
}

const dialogMock = {
}

describe('TaskBoardComponent', () => {
  let component: TaskBoardComponent;
  let fixture: ComponentFixture<TaskBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskBoardComponent],
      providers: [
        { provide: TaskService, useValue: taskMockService },
        { provide: MatDialog, useValue: dialogMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBoardComponent);
    component = fixture.componentInstance;
    let task = new Task();
    task.status = TaskStatus.InProgress;
    component.tasks$ = of([task])
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
