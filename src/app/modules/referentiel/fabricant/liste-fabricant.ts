import { Component, OnInit } from '@angular/core';
import { Fabricant } from '../../shared/model/fabricant/fabricant.model';
import { MessageService } from 'primeng/api';
import { FabricantService } from '../../shared/service/fabricant/fabricant.service';
import { finalize } from 'rxjs';
import {PaysService} from '../../shared/service/pays/pays.service';
import { PrimeNGConfig } from 'primeng/api';


@Component({
	selector: 'app-fabricant',
	templateUrl: './liste-fabricant.html',
	styleUrls: ['./fabricant.component.scss'],
})
export class ListeFabricant implements OnInit {
	idFabricant: number;
	fabricant: Fabricant;
	fabricants: Fabricant[] = [];
	fabricantSelectionne: Fabricant;
	fabricantModaleVisible: boolean;
	chargement: boolean;

	constructor(private fabricantService: FabricantService,
		private messageService: MessageService,
		private primeNgConfig: PrimeNGConfig, private paysService: PaysService
	) {
	}

	ngOnInit(): void {
		this.recupererFabricant();
		this.recupererTradctionFiltre();
	}

	public recupererTradctionFiltre(): void {
		this.primeNgConfig.setTranslation({
			startsWith: 'Commence par',
			contains: 'Contient',
			notContains: 'Ne contient pas',
			endsWith: 'Fini par',
			equals: 'Egale à',
			notEquals: 'Différent de',
			noFilter: 'Pas de filtre',
			reject: 'Non',
			accept: 'Oui'
		});
		this.recupererTradctionFiltre();
	}

	/**
	 * Récupère la liste des importateurs
	 */
	recupererFabricant(): void {
		this.chargement = true;
		this.fabricantService
			.recupererFabricants()
			.pipe(finalize(() => (this.chargement = false)))
			.subscribe({
				next: (data) => {
					this.fabricants = data;
				},
				error: (err) => {
					this.messageService.add({
						severity: 'error',
						summary: 'Error',
						detail: err.message,
						life: 5000,
					});
				},
			});
	}

	/**
	 * Cette méthode permet d'ouvrir le modal d'insertation ou modification
	 *
	 * @param fabricant le fabricant
	 */
	ouvriModal(fabricant?: Fabricant) {
		this.fabricantModaleVisible = true;
		this.idFabricant = fabricant?.id;
	}
}
