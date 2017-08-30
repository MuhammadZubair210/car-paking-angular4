import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlluserbookingsComponent } from './alluserbookings.component';

describe('AlluserbookingsComponent', () => {
  let component: AlluserbookingsComponent;
  let fixture: ComponentFixture<AlluserbookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlluserbookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlluserbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
