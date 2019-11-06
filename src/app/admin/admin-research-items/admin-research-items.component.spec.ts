import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResearchItemsComponent } from './admin-research-items.component';

describe('AdminResearchItemsComponent', () => {
  let component: AdminResearchItemsComponent;
  let fixture: ComponentFixture<AdminResearchItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminResearchItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminResearchItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
