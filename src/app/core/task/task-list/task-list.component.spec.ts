import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/task';
import { of } from 'rxjs';

const taskMockService = {
  updateTask: function (a, b) {
  }
}

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [
        { provide: TaskService, useValue: taskMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    component.tasks$ = of([new Task, new Task])
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
