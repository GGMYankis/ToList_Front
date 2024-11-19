import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerInterceptorComponent } from './spinner-interceptor.component';

describe('SpinnerInterceptorComponent', () => {
  let component: SpinnerInterceptorComponent;
  let fixture: ComponentFixture<SpinnerInterceptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerInterceptorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerInterceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
