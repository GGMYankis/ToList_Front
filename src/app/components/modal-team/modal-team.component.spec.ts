import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTeamComponent } from './modal-team.component';

describe('ModalTeamComponent', () => {
  let component: ModalTeamComponent;
  let fixture: ComponentFixture<ModalTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
