import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSprintsPageComponent } from './project-sprints-page.component';

describe('ProjectSprintsPageComponent', () => {
  let component: ProjectSprintsPageComponent;
  let fixture: ComponentFixture<ProjectSprintsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSprintsPageComponent ]
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
