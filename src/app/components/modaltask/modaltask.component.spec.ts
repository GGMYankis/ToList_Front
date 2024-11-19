import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaltaskComponent } from './modaltask.component';

describe('ModaltaskComponent', () => {
  let component: ModaltaskComponent;
  let fixture: ComponentFixture<ModaltaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaltaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaltaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
