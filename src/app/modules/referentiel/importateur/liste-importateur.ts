import {Component, OnInit} from '@angular/core';
import {Importateur} from '../../shared/model/importateur/importateur.model';
import {ImportateurService} from '../../shared/service/importateur/importateur.service';
import {MessageService} from 'primeng/api';
import {finalize} from "rxjs";

@Component({
	selector: 'liste-importateur',
	templateUrl: './liste-importateur.html',
	styleUrls: ['./importateur.component.scss']
})
export class ListeImportateur implements OnInit {
	idImportateur: number;
	importateur: Importateur;
	importateurs: Importateur[] = [];
	importateurSelectionne: Importateur;
	submitted: boolean;
	importateurDialogVisible: boolean;
	chargement: boolean;

	constructor(private importateurService: ImportateurService,
				private messageService: MessageService) {
	}

	ngOnInit(): void {
		this.recupererImportateur();
	}


	/**
	 * Récupère les importateurs
	 */
	recupererImportateur(): void {
		this.chargement = true;
		this.importateurService.recupererImportateur()
			.pipe(finalize(() => this.chargement = false))
			.subscribe({
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
		this.importateurDialogVisible = true;
		this.idImportateur = importateur?.id;
	}
}
