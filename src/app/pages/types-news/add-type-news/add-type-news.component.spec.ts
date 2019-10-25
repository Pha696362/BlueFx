import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeNewsComponent } from './add-type-news.component';

describe('AddTypeNewsComponent', () => {
  let component: AddTypeNewsComponent;
  let fixture: ComponentFixture<AddTypeNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
