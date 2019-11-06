import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchItemsComponent } from './research-items.component';

describe('ResearchItemsComponent', () => {
  let component: ResearchItemsComponent;
  let fixture: ComponentFixture<ResearchItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
