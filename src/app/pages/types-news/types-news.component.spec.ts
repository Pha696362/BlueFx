import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesNewsComponent } from './types-news.component';

describe('TypesNewsComponent', () => {
  let component: TypesNewsComponent;
  let fixture: ComponentFixture<TypesNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
