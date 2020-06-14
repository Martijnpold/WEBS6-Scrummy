import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { ProjectService } from 'src/app/services/project.service';
import { of } from 'rxjs';
import { MockComponent } from 'ng-mocks';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { Project } from 'src/app/model/project';
import { AppMaterialModule } from 'src/app/app-material.module';
import { AuthService } from 'src/app/services/auth.service';

const projectMockService = {
  getAll: function () {
    return of([
      {},
      {}
    ]);
  }
}

const authMock = {
  getUser: function() {
    return of({})
  }
}

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListComponent, MockComponent(ProjectItemComponent)],
      providers: [
        { provide: ProjectService, useValue: projectMockService },
        { provide: AuthService, useValue: authMock }
      ],
      imports: [
        AppMaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    component.projects$ = of([new Project(), new Project()])
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have 2 courses', (done) => {
  //   component.projects$.subscribe((p) => {
  //     expect(p.length).toBe(2);
  //     done();
  //   })
  // })
});
