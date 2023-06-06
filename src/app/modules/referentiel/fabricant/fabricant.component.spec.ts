import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricantComponent } from './fabricant.component';

describe('FabricantComponent', () => {
  let component: FabricantComponent;
  let fixture: ComponentFixture<FabricantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabricantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
