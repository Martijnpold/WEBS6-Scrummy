import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingsPageComponent } from './project-settings-page.component';
import { of } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

const projectMockService = {
  get: function (a) {
    return of({});
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

const authMock = {
  getUser: function () {
    return of({})
  }
}

describe('ProjectSettingsPageComponent', () => {
  let component: ProjectSettingsPageComponent;
  let fixture: ComponentFixture<ProjectSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectSettingsPageComponent],
      providers: [
        { provide: ProjectService, useValue: projectMockService },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: AuthService, useValue: authMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
