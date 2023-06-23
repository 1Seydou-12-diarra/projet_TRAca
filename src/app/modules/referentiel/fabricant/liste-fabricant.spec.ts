import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFabricant } from './liste-fabricant';

describe('FabricantComponent', () => {
  let component: ListeFabricant;
  let fixture: ComponentFixture<ListeFabricant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeFabricant ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeFabricant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
