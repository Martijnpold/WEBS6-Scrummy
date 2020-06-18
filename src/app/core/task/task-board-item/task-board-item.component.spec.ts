import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardItemComponent } from './task-board-item.component';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ScrummyUserService } from 'src/app/services/scrummy-user.service';
import { Task } from 'src/app/model/task';

const suserMockService = {
  get: function (a) {
    return of({});
  }
}

const dialogMock = {
}

describe('TaskBoardItemComponent', () => {
  let component: TaskBoardItemComponent;
  let fixture: ComponentFixture<TaskBoardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskBoardItemComponent],
      providers: [
        { provide: ScrummyUserService, useValue: suserMockService },
        { provide: MatDialog, useValue: dialogMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBoardItemComponent);
    component = fixture.componentInstance;
    component.task = new Task();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
