import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBurndownComponent } from './sprint-burndown.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Sprint } from 'src/app/model/sprint';
import { Task } from 'src/app/model/task';
import { firestore } from 'firebase';

let sprint = new Sprint();
sprint.startDate = firestore.Timestamp.now();
sprint.endDate = firestore.Timestamp.now();

const dataMock = {
  sprint$: of(sprint),
  tasks$: of([])
}

describe('SprintBurndownComponent', () => {
  let component: SprintBurndownComponent;
  let fixture: ComponentFixture<SprintBurndownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SprintBurndownComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dataMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintBurndownComponent);
    component = fixture.componentInstance;
    component.sprint$ = of(sprint);
    component.tasks$ = of([])
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
