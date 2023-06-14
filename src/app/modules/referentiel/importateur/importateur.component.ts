import {Component, OnInit} from '@angular/core';
import {Importateur} from '../../shared/model/importateur/importateur.model';
import {ImportateurService} from '../../shared/service/importateur/importateur.service';
import {MessageService} from 'primeng/api';

@Component({
	selector: 'app-importateur',
	templateUrl: './importateur.component.html',
	styleUrls: ['./importateur.component.scss']
})
export class ImportateurComponent implements OnInit {
	idImportateur: number;
	importateur: Importateur;
	importateurs: Importateur[] = [];
	importateurSelectionne: Importateur;
	submitted: boolean;
	importateurDialog: boolean;

	constructor(
		private importateurService: ImportateurService,
		private messageService: MessageService,
	) {
	}

	ngOnInit(): void {
		this.recupererImportateur();
	}

	/**
	 * Cette méthode permet de lister tous les importateur
	 * @param importateur
	 */
	recupererImportateur(): void {
		this.importateurService.recupererImportateur().subscribe({
			next: data => {
				this.importateurs = data;
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
	 * Cette méthode permet d'ouvrir le modal d'insertation ou modification
	 * @param importateur
	 */
	ouvriModal(importateur?: Importateur) {
		this.submitted = false;
		this.importateurDialog = true;
		this.idImportateur = importateur?.id;
	}
}
