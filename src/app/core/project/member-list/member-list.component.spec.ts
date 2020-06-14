import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberListComponent } from './member-list.component';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ScrummyUserService } from 'src/app/services/scrummy-user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/model/project';

const toastrMock = {
  success: function (msg) {
  },
  error: function (msg) {
  }
}

const suserMock = {
  getAll: function () {
    return of([{ displayName: 'mpolder' }, { id: '1234', displayName: 'gv_sin' }])
  }
}

const projectMockService = {
  update: function (a) {
  }
}

describe('MemberListComponent', () => {
  let component: MemberListComponent;
  let fixture: ComponentFixture<MemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberListComponent],
      providers: [
        { provide: ToastrService, useValue: toastrMock },
        { provide: ScrummyUserService, useValue: suserMock },
        { provide: ProjectService, useValue: projectMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add', () => {
    let spy = spyOn(projectMockService, 'update');
    component.invitee = 'gv_sin';
    let proj = new Project();
    proj.members = []
    component.invite(proj);
    expect(spy.calls.count()).toBe(1);
    expect(proj.members).toContain('1234');
  })

  it('should not add', () => {
    let spy = spyOn(projectMockService, 'update');
    component.invitee = 'gv_sinsss';
    component.invite(new Project());
    expect(spy.calls.count()).toBe(0);
  })
});
