import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { ProjectService } from 'src/app/services/project.service';
import { of } from 'rxjs';
import { MockComponent } from 'ng-mocks';
import { ProjectItemComponent } from '../project-item/project-item.component';

const projectMockService = {
  getAll: function () {
    return of([
      {},
      {}
    ]);
  }
}

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListComponent, MockComponent(ProjectItemComponent)],
      providers: [
        { provide: ProjectService, useValue: projectMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 courses', (done) => {
    component.projects$.subscribe((p) => {
      expect(p.length).toBe(2);
      done();
    })
  })
});
