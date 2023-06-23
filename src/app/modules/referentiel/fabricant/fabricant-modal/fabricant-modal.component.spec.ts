import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricantModal } from './fabricant-modal.component';

describe('FabricantModal', () => {
  let component: FabricantModal;
  let fixture: ComponentFixture<FabricantModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricantModal ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabricantModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
