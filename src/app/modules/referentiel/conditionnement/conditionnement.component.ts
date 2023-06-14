import {Component, OnInit} from '@angular/core';
import {Conditionnement} from '../../shared/model/conditionnement/conditionnement.model';
import {ConditionnementService} from '../../shared/service/conditionnement/conditionnement.service';
import {MessageService} from 'primeng/api';

@Component({
	selector: 'app-conditionnement',
	templateUrl: './conditionnement.component.html',
	styleUrls: ['./conditionnement.component.scss']
})
export class ConditionnementComponent implements OnInit {

	conditionnement: Conditionnement;
	conditionnements: Conditionnement[] = [];
	conditionnementSelectionne: Conditionnement;

	constructor(
		private conditionnementService: ConditionnementService,
		private messageService: MessageService,
	) {
	}

	ngOnInit(): void {
		this.recupererConditionnement();
	}

	recupererConditionnement(): void {
		this.conditionnementService.recupererConditionnement().subscribe({
			next: data => {
				this.conditionnements = data;
				console.log(data);
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
