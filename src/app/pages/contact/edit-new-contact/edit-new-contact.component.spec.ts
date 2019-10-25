import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewContactComponent } from './edit-new-contact.component';

describe('EditNewContactComponent', () => {
  let component: EditNewContactComponent;
  let fixture: ComponentFixture<EditNewContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNewContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
