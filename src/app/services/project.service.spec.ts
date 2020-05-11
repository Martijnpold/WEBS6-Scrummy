import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
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

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: firestoreMock }
      ]
    });
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
