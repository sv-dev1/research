import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceSingleComponent } from './conference-single.component';

describe('ConferenceSingleComponent', () => {
  let component: ConferenceSingleComponent;
  let fixture: ComponentFixture<ConferenceSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferenceSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
