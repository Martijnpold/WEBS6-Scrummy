import { TestBed } from '@angular/core/testing';
import { ScrummyUserService } from './scrummy-user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

const firestoreMock = {
  collection: function (name) {
    return {
      valueChanges: () => of([
        {}
      ])
    }
  }
}

describe('ScrummyUserService', () => {
  let service: ScrummyUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: firestoreMock }
      ]
    });
    service = TestBed.inject(ScrummyUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
