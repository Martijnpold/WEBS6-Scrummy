import { TestBed } from '@angular/core/testing';
import { ScrummyUserService } from './scrummy-user.service';


describe('ScrummyUserService', () => {
  let service: ScrummyUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrummyUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
