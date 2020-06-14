import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMenuComponent } from './project-menu.component';
import { of } from 'rxjs';
import { SprintService } from 'src/app/services/sprint.service';

const mockSprintService = {
  getSprints$: function (a) {
    return of([{}, {}]);
  }
}

describe('ProjectMenuComponent', () => {
  let component: ProjectMenuComponent;
  let fixture: ComponentFixture<ProjectMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectMenuComponent],
      providers: [
        { provide: SprintService, useValue: mockSprintService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
