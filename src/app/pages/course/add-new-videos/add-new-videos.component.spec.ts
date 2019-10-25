import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVideosComponent } from './add-new-videos.component';

describe('AddNewVideosComponent', () => {
  let component: AddNewVideosComponent;
  let fixture: ComponentFixture<AddNewVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
