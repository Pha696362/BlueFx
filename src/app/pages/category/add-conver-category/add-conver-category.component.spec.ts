import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConverCategoryComponent } from './add-conver-category.component';

describe('AddConverCategoryComponent', () => {
  let component: AddConverCategoryComponent;
  let fixture: ComponentFixture<AddConverCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConverCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConverCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
