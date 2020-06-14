import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTasksPageComponent } from './project-tasks-page.component';
import { of } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { SprintService } from 'src/app/services/sprint.service';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

const projectMockService = {
  get: function (a) {
    return of({});
  }
}

const sprintMockService = {
  get$: function (a, b) {
    return of({});
  },
  getActiveSprint$: function (a) {
    return of({});
  }
}

const taskMockService = {
  getTasksOfSprint$: function (a, b) {
    return of([{}]);
  },
  getTasks$: function(a) {
    return of([{}, {}])
  }
}

const routeMock = {
  params: of({
    pid: '1234',
    sid: '5678'
  }),
  snapshot: {
    paramMap: {
      get: function (a) {
        return '1234'
      }
    }
  }
}

const dialogMock = {

}

const authMock = {
  getUser: function () {
    return of({})
  }
}

describe('ProjectTasksPageComponent', () => {
  let component: ProjectTasksPageComponent;
  let fixture: ComponentFixture<ProjectTasksPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectTasksPageComponent],
      providers: [
        { provide: ProjectService, useValue: projectMockService },
        { provide: SprintService, useValue: sprintMockService },
        { provide: TaskService, useValue: taskMockService },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: AuthService, useValue: authMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
