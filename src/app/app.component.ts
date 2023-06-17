import {Component, OnInit} from '@angular/core';
import {AuthService} from './modules/shared/service/auth.service';
import {NavigationService} from './modules/shared/service/navigation.service';
import {PrimeNGConfig} from 'primeng/api';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


	constructor(private authService: AuthService,
				private navigationService: NavigationService,
				private primeNgConfig: PrimeNGConfig) {
	}

	ngOnInit(): void {
		if (!this.authService.isAuthenticated()) {
			this.navigationService.goToConnexion();
		}
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
	}

}
