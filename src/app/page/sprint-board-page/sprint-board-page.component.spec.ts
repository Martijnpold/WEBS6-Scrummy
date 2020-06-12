import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBoardPageComponent } from './sprint-board-page.component';

describe('SprintBoardPageComponent', () => {
  let component: SprintBoardPageComponent;
  let fixture: ComponentFixture<SprintBoardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintBoardPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
