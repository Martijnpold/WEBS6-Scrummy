import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailComponent } from './project-detail.component';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScrummyUserService } from 'src/app/services/scrummy-user.service';
import { ProjectService } from 'src/app/services/project.service';

const mockData = {
  project_id: 'abcd'
}

const suserMockService = {
  getMembers$: function (a) {
    return of([{}])
  }
}

const projectMockService = {
  get: function (a) {
    return of({});
  }
}

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDetailComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: ScrummyUserService, useValue: suserMockService },
        { provide: ProjectService, useValue: projectMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
