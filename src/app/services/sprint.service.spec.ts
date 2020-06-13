import { TestBed } from '@angular/core/testing';

import { SprintService } from './sprint.service';
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

describe('SprintService', () => {
  let service: SprintService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: firestoreMock }
      ]
    });
    service = TestBed.inject(SprintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
