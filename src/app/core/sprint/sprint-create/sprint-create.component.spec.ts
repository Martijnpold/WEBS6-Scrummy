import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintCreateComponent } from './sprint-create.component';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SprintService } from 'src/app/services/sprint.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { Project } from 'src/app/model/project';

const authMock = {
  getUser: function () {
    return of({})
  }
}

const sprintMockService = {
  create: function (a) {
  }
}

const dialogMockRef = {
  close: function () {
  }
}

const dataMock = {
  project: of({})
}

describe('SprintCreateComponent', () => {
  let component: SprintCreateComponent;
  let fixture: ComponentFixture<SprintCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SprintCreateComponent],
      providers: [
        { provide: AuthService, useValue: authMock },
        { provide: SprintService, useValue: sprintMockService },
        { provide: MatDialogRef, useValue: dialogMockRef },
        { provide: MAT_DIALOG_DATA, useValue: dataMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should save', () => {
    let spy = spyOn(sprintMockService, 'create')
    component.createForm.get('name').setValue('some name')
    component.createForm.get('startDate').setValue(new Date())
    component.createForm.get('endDate').setValue(new Date())
    component.create(new ScrummyUser(), new Project());
    expect(spy.calls.count()).toBe(1);
  })

  it('should not save - Name', () => {
    let spy = spyOn(sprintMockService, 'create')
    component.createForm.get('startDate').setValue(new Date())
    component.createForm.get('endDate').setValue(new Date())
    component.create(new ScrummyUser(), new Project());
    expect(spy.calls.count()).toBe(0);
  })

  it('should not save - StartDate', () => {
    let spy = spyOn(sprintMockService, 'create')
    component.createForm.get('name').setValue('some name')
    component.createForm.get('endDate').setValue(new Date())
    component.create(new ScrummyUser(), new Project());
    expect(spy.calls.count()).toBe(0);
  })

  it('should not save - EndDate', () => {
    let spy = spyOn(sprintMockService, 'create')
    component.createForm.get('name').setValue('some name')
    component.createForm.get('startDate').setValue(new Date())
    component.create(new ScrummyUser(), new Project());
    expect(spy.calls.count()).toBe(0);
  })
});
