import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintCreateComponent } from './sprint-create.component';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SprintService } from 'src/app/services/sprint.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
});
