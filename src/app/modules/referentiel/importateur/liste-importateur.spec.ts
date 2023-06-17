import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ListeImportateur} from './liste-importateur';


describe('ImportateurComponent', () => {
	let component: ListeImportateur;
	let fixture: ComponentFixture<ListeImportateur>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ListeImportateur]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ListeImportateur);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
