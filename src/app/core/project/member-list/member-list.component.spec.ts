import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberListComponent } from './member-list.component';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ScrummyUserService } from 'src/app/services/scrummy-user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/model/project';
import { ScrummyUser } from 'src/app/model/scrummy-user';

const toastrMock = {
  success: function (msg) {
  },
  error: function (msg) {
  }
}

let one = new ScrummyUser();
one.displayName = 'mpolder';
let two = new ScrummyUser();
two.displayName = 'gv_sin'
two.id = '1234'

const users = [
  one, two
]

const suserMock = {
  getAll: function () {
    return of(users)
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
    component.invite(proj, users);
    expect(spy.calls.count()).toBe(1);
    expect(proj.members).toContain('1234');
  })

  it('should not add', () => {
    let spy = spyOn(projectMockService, 'update');
    component.invitee = 'gv_sinsss';
    component.invite(new Project(), users);
    expect(spy.calls.count()).toBe(0);
  })
});
