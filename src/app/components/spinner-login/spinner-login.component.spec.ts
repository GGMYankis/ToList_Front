import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerLoginComponent } from './spinner-login.component';

describe('SpinnerLoginComponent', () => {
  let component: SpinnerLoginComponent;
  let fixture: ComponentFixture<SpinnerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
