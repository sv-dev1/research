import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewBlogComponent } from './admin-new-blog.component';

describe('AdminNewBlogComponent', () => {
  let component: AdminNewBlogComponent;
  let fixture: ComponentFixture<AdminNewBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
