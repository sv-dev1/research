import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResearchItemComponent } from './add-research-item.component';

describe('AddResearchItemComponent', () => {
  let component: AddResearchItemComponent;
  let fixture: ComponentFixture<AddResearchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddResearchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
