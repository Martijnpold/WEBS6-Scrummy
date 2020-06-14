import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsPageComponent } from './projects-page.component';
import { of } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

const projectMockService = {
  getAll: function (a) {
    return of([{}]);
  }
}

const dialogMock = {
  open: function (a) {
  }
}

const authMock = {
  getUser: function () {
    return of({})
  }
}

describe('ProjectsPageComponent', () => {
  let component: ProjectsPageComponent;
  let fixture: ComponentFixture<ProjectsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsPageComponent],
      providers: [
        { provide: ProjectService, useValue: projectMockService },
        { provide: MatDialog, useValue: dialogMock },
        { provide: AuthService, useValue: authMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
