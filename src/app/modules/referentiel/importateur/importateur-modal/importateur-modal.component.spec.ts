import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportateurModal } from './importateur-modal.component';

describe('ImportateurModal', () => {
  let component: ImportateurModal;
  let fixture: ComponentFixture<ImportateurModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportateurModal ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportateurModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
