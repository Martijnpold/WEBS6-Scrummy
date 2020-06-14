import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreateComponent } from './task-create.component';
import { of } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/model/task';
import { Project } from 'src/app/model/project';
import { ScrummyUser } from 'src/app/model/scrummy-user';

const taskMockService = {
  getTasksOfSprint$: function (a, b) {
    return of([{}]);
  },
  createTask: function (a, b) {
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

describe('TaskCreateComponent', () => {
  let component: TaskCreateComponent;
  let fixture: ComponentFixture<TaskCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCreateComponent],
      providers: [
        { provide: TaskService, useValue: taskMockService },
        { provide: AuthService, useValue: authMock },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: dataMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save', () => {
    let spy = spyOn(taskMockService, 'createTask')
    component.createForm.get('name').setValue('some name')
    component.createForm.get('description').setValue('some task description should go here but for now we dont bother writing a good one')
    component.createForm.get('story_points').setValue(4)
    component.create(new ScrummyUser(), new Project());
    expect(spy.calls.count()).toBe(1);
  })

  it('should not save - Name', () => {
    let spy = spyOn(taskMockService, 'createTask')
    component.createForm.get('description').setValue('some task description should go here but for now we dont bother writing a good one')
    component.createForm.get('story_points').setValue(4)
    component.create(new ScrummyUser(), new Project());
    expect(spy.calls.count()).toBe(0);
  })

  it('should not save - Description', () => {
    let spy = spyOn(taskMockService, 'createTask')
    component.createForm.get('name').setValue('some name')
    component.createForm.get('story_points').setValue(4)
    component.create(new ScrummyUser(), new Project());
    expect(spy.calls.count()).toBe(0);
  })

  it('should not save - StoryPoints', () => {
    let spy = spyOn(taskMockService, 'createTask')
    component.createForm.get('name').setValue('some name')
    component.createForm.get('description').setValue('some task description should go here but for now we dont bother writing a good one')
    component.create(new ScrummyUser(), new Project());
    expect(spy.calls.count()).toBe(0);
  })
});
