import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintItemComponent } from './sprint-item.component';
import { SprintService } from 'src/app/services/sprint.service';
import { AppMaterialModule } from 'src/app/app-material.module';
import { Sprint } from 'src/app/model/sprint';
import { Project } from 'src/app/model/project';
import { firestore } from 'firebase';

describe('SprintItemComponent', () => {
  let component: SprintItemComponent;
  let fixture: ComponentFixture<SprintItemComponent>;

  const sprintMockService = {
    setActive: function (a, b) {
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SprintItemComponent],
      providers: [
        { provide: SprintService, useValue: sprintMockService }
      ],
      imports: [
        AppMaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintItemComponent);
    component = fixture.componentInstance;
    component.sprint = new Sprint();
    component.sprint.startDate = firestore.Timestamp.now();
    component.sprint.endDate = firestore.Timestamp.now();
    component.project = new Project();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
