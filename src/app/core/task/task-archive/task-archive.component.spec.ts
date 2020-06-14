import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskArchiveComponent } from './task-archive.component';
import { of } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

const projectMockService = {
  get: function (a) {
    return of({});
  }
}

const taskMockService = {
  getTasks$: function (a, b, c) {
    return of([{}]);
  }
}

const dataMock = {
  project_id: 'abcde'
}

describe('TaskArchiveComponent', () => {
  let component: TaskArchiveComponent;
  let fixture: ComponentFixture<TaskArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskArchiveComponent],
      providers: [
        { provide: ProjectService, useValue: projectMockService },
        { provide: TaskService, useValue: taskMockService },
        { provide: MAT_DIALOG_DATA, useValue: dataMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
