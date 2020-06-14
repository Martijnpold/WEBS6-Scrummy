import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMembersPageComponent } from './project-members-page.component';
import { of } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { ScrummyUserService } from 'src/app/services/scrummy-user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

const routeMock = {
  params: of({
    pid: '1234',
    sid: '5678'
  }),
  snapshot: {
    paramMap: {
      get: function(a) {
        return 'abcde'
      }
    }
  }
}

const projectMockService = {
  get: function (a) {
    return of({});
  }
}

const authMock = {
  getUser: function () {
    return of({})
  }
}

const suserMock = {
  getMembers$: function (a) {
    return of([{}])
  }
}

describe('ProjectMembersPageComponent', () => {
  let component: ProjectMembersPageComponent;
  let fixture: ComponentFixture<ProjectMembersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectMembersPageComponent],
      providers: [
        { provide: ProjectService, useValue: projectMockService },
        { provide: ScrummyUserService, useValue: suserMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: AuthService, useValue: authMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMembersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
