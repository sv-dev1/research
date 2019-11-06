import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleBlogComponent } from './admin-single-blog.component';

describe('AdminSingleBlogComponent', () => {
  let component: AdminSingleBlogComponent;
  let fixture: ComponentFixture<AdminSingleBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSingleBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSingleBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
