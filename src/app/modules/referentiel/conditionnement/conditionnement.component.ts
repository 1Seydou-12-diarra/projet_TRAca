import {Component, OnInit} from '@angular/core';
import {Conditionnement} from '../../shared/model/conditionnement/conditionnement.model';
import {ConditionnementService} from '../../shared/service/conditionnement/conditionnement.service';
import {MessageService} from 'primeng/api';
import {finalize} from "rxjs";

@Component({
	selector: 'app-conditionnement',
	templateUrl: './conditionnement.component.html',
	styleUrls: ['./conditionnement.component.scss']
})
export class ConditionnementComponent implements OnInit {

	idConditionnement: number;
	conditionnement: Conditionnement;
	conditionnements: Conditionnement[] = [];
	conditionnementSelectionne: Conditionnement;
	conditionnementDialogVisible: boolean;
	chargement: boolean;

	constructor(private conditionnementService: ConditionnementService,
				private messageService: MessageService) {
	}

	ngOnInit(): void {
		this.afficherConditionnement();
	}


	/**
	 * Récupère les Conditionnements
	 */
	afficherConditionnement(): void {
		this.chargement = true;
		this.conditionnementService.recupererConditionnement()
			.pipe(finalize(() => this.chargement = false))
			.subscribe({
				next: data => {
					this.conditionnements = data;
					console.log(data)
				},
				error: err => {
					this.messageService.add({
						severity: 'error',
						summary: 'Error',
						detail: err.message,
						sticky: true,
					});
				}
			})
	}

	/**
	 * Cette méthode permet d'ouvrir la modal pour des conditionnements
	 *
	 * @param conditionnement le conditionnement
	 */
	ouvriModal(conditionnement?: Conditionnement): void {
		this.conditionnementDialogVisible = true;
		this.idConditionnement = conditionnement?.id;
	}
}
