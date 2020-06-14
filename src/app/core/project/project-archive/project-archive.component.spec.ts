import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectArchiveComponent } from './project-archive.component';
import { ProjectService } from 'src/app/services/project.service';
import { AppMaterialModule } from 'src/app/app-material.module';
import { of } from 'rxjs';

const projectServiceMock = {
  getAll: function() {
    return of([{}, {}])
  }
}

describe('ProjectArchiveComponent', () => {
  let component: ProjectArchiveComponent;
  let fixture: ComponentFixture<ProjectArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectArchiveComponent ],
      providers: [
        { provide: ProjectService, useValue: projectServiceMock },
      ],
      imports: [
        AppMaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
