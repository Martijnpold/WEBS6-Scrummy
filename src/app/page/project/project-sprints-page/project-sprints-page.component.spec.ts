import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSprintsPageComponent } from './project-sprints-page.component';
import { of } from 'rxjs';
import { Project } from 'src/app/model/project';
import { Sprint } from 'src/app/model/sprint';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { ProjectService } from 'src/app/services/project.service';
import { SprintService } from 'src/app/services/sprint.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';

const authMockService = {
  getUser: function () {
    return of(new ScrummyUser());
  }
}

const projectMockService = {
  get: function (a) {
    return of(new Project())
  }
}

const sprintMockService = {
  getSprints$: function (a) {
    return of([
      new Sprint()
    ])
  }
}

const routeMock = {
  snapshot: {
    paramMap: {
      get: function (a) {
        return 'test_id';
      }
    }
  }
}

const matMockDialog = {
  open: function (a, b) {
  }
}

describe('ProjectSprintsPageComponent', () => {
  let component: ProjectSprintsPageComponent;
  let fixture: ComponentFixture<ProjectSprintsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectSprintsPageComponent],
      providers: [
        { provide: ProjectService, useValue: projectMockService },
        { provide: SprintService, useValue: sprintMockService },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: AuthService, useValue: authMockService },
        { provide: MatDialog, useValue: matMockDialog },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSprintsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
