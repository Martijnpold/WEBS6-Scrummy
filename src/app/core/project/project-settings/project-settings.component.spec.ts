import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingsComponent } from './project-settings.component';
import { ProjectService } from 'src/app/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Project } from 'src/app/model/project';

const projectMockService = {
  update: function (a) {
  }
}

const toastrMock = {
  success: function (msg) {
  }
}

describe('ProjectSettingsComponent', () => {
  let component: ProjectSettingsComponent;
  let fixture: ComponentFixture<ProjectSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectSettingsComponent],
      providers: [
        { provide: ProjectService, useValue: projectMockService },
        { provide: ToastrService, useValue: toastrMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSettingsComponent);
    component = fixture.componentInstance;
    component.project$ = of(new Project())
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
