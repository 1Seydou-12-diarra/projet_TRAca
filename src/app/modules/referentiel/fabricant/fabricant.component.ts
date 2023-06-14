import {Component, OnInit} from '@angular/core';
import {Fabricant} from '../../shared/model/fabricant/fabricant.model';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {FabricantService} from '../../shared/service/fabricant/fabricant.service';
import {PaysService} from '../../shared/service/pays/pays.service';
import {Pays} from '../../shared/model/pays/pays.model';

@Component({
	selector: 'app-fabricant',
	templateUrl: './fabricant.component.html',
	styleUrls: ['./fabricant.component.scss']
})
export class FabricantComponent implements OnInit {
	pays: Pays[] = [];
	fabricant: Fabricant;
	fabricants: Fabricant[] = [];
	fabricantSelectionne: Fabricant;
	submitted: boolean;

	constructor(
		private paysService: PaysService,
		private fabricantService: FabricantService,
		private messageService: MessageService,
		private primeConfig: PrimeNGConfig,
	) {
	}


	ngOnInit(): void {
		this.recupererFabricant();
	}

	recupererFabricant(): void {
		this.fabricantService.recupererFabricants().subscribe({
			next: data => {
				this.fabricants = data;
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

	recupererPays(): void {
		this.paysService.recupererPays().subscribe({
			next: data => {
				this.pays = data;
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
}
