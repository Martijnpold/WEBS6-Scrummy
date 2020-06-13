import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ScrummyUserService } from './scrummy-user.service';
import { AngularFireAuth } from '@angular/fire/auth';

const firestoreMock = {
  collection: function (name) {
    return {
      valueChanges: () => of([
        {}
      ])
    }
  }
}

const suserMockService = {
  get: function () {
    return of({});
  }
}

const fireAuthMock = {

}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: firestoreMock },
        { provide: ScrummyUserService, useValue: suserMockService },
        { provide: AngularFireAuth, useValue: fireAuthMock },
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
