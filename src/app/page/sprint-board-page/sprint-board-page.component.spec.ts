import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBoardPageComponent } from './sprint-board-page.component';
import { of } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { SprintService } from 'src/app/services/sprint.service';
import { TaskService } from 'src/app/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

const projectMockService = {
  get: function (a) {
    return of({});
  }
}

const sprintMockService = {
  get$: function (a, b) {
    return of({});
  }
}

const taskMockService = {
  getTasksOfSprint$: function (a, b) {
    return of([{}]);
  }
}

const routeMock = {
  params: of({
    pid: '1234',
    sid: '5678'
  })
}

const dialogMock = {

}

const authMock = {
  getUser: function() {
    return of({})
  }
}

describe('SprintBoardPageComponent', () => {
  let component: SprintBoardPageComponent;
  let fixture: ComponentFixture<SprintBoardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SprintBoardPageComponent],
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
    fixture = TestBed.createComponent(SprintBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
