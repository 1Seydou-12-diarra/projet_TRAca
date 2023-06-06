import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportateurModalComponent } from './importateur-modal.component';

describe('ImportateurModalComponent', () => {
  let component: ImportateurModalComponent;
  let fixture: ComponentFixture<ImportateurModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportateurModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportateurModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
