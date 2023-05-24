import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/shared/service/auth.service';
import { NavigationService } from './modules/shared/service/navigation.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


	constructor(private authService: AuthService,
				private navigationService: NavigationService) {}

	ngOnInit(): void {
		if (!this.authService.isAuthenticated()) {
			this.navigationService.goToConnexion();
		}
	}
}
