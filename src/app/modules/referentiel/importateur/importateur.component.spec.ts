import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportateurComponent } from './importateur.component';

describe('ImportateurComponent', () => {
  let component: ImportateurComponent;
  let fixture: ComponentFixture<ImportateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
