import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionnementModalComponent } from './conditionnement-modal.component';

describe('ConditionnementModalComponent', () => {
  let component: ConditionnementModalComponent;
  let fixture: ComponentFixture<ConditionnementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionnementModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionnementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
