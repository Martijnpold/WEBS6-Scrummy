import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { ScrummyUser } from '../model/scrummy-user';
import { AuthService } from './auth.service';

const firestoreMock = {
  collection: function (name) {
    return {
      valueChanges: () => of([
        {}
      ])
    }
  }
}

const authServiceMock = {
  getUser() {
    let user = new ScrummyUser();
    user.id = 'user_id'
    user.displayName = 'testUser'
    return of(user);
  }
}

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: firestoreMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    });
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
