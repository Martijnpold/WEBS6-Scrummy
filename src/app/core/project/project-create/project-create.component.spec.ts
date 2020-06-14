import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreateComponent } from './project-create.component';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { AppMaterialModule } from 'src/app/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectCreateComponent', () => {
  let component: ProjectCreateComponent;
  let fixture: ComponentFixture<ProjectCreateComponent>;

  const authServiceMock = {
    getUser() {
      let user = new ScrummyUser();
      user.id = 'user_id'
      user.displayName = 'testUser'
      return of(user);
    }
  }

  const projectServiceMock = {
    create: function (a) {
    }
  }

  const matMockDialogRed = {
    close: function () {
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCreateComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: MatDialogRef, useValue: matMockDialogRed },
        { provide: ProjectService, useValue: projectServiceMock },
      ],
      imports: [
        AppMaterialModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save', () => {
    let spy = spyOn(projectServiceMock, 'create')
    component.createForm.get('name').setValue('some name')
    component.createForm.get('description').setValue('some project description should go here but this is a test')
    component.create(new ScrummyUser());
    expect(spy.calls.count()).toBe(1);
  })

  it('should not save - Description', () => {
    let spy = spyOn(projectServiceMock, 'create')
    component.createForm.get('name').setValue('some name')
    component.create(new ScrummyUser());
    expect(spy.calls.count()).toBe(0);
  })

  it('should not save - Name', () => {
    let spy = spyOn(projectServiceMock, 'create')
    component.createForm.get('description').setValue('some project description should go here but this is a test')
    component.create(new ScrummyUser());
    expect(spy.calls.count()).toBe(0);
  })
});
