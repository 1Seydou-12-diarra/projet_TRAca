import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Accueil} from './accueil';

describe('AccueilComponent', () => {
	let component: Accueil;
	let fixture: ComponentFixture<Accueil>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [Accueil]
		})
			.compileComponents();

		fixture = TestBed.createComponent(Accueil);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
