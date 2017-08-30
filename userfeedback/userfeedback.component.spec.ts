import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserfeedbackComponent } from './userfeedback.component';

describe('UserfeedbackComponent', () => {
  let component: UserfeedbackComponent;
  let fixture: ComponentFixture<UserfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
