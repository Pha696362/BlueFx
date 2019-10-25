import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCourseCoverComponent } from './add-new-course-cover.component';

describe('AddNewCourseCoverComponent', () => {
  let component: AddNewCourseCoverComponent;
  let fixture: ComponentFixture<AddNewCourseCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCourseCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCourseCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
