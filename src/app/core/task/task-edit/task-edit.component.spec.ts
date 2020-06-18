import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditComponent } from './task-edit.component';
import { of } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScrummyUserService } from 'src/app/services/scrummy-user.service';

const taskMockService = {
  getTasksOfSprint$: function (a, b) {
    return of([{}]);
  },
  createTask: function (a, b) {
  },
  get$: function (a, b) {
    return of({});
  }
}

const authMock = {
  getUser: function () {
    return of({})
  }
}

const dialogMock = {
  close: function () {
  }
}

const dataMock = {
  project: of({})
}

const suserMockService = {
  get: function (a) {
    return of({});
  },
  getMembers$: function (a) {
    return of([{}]);
  }
}

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskEditComponent],
      providers: [
        { provide: ScrummyUserService, useValue: suserMockService },
        { provide: TaskService, useValue: taskMockService },
        { provide: AuthService, useValue: authMock },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: dataMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
