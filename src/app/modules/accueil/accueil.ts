import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/service/auth.service';
import {Utilisateur} from '../shared/model/auth/utilisateur.model';

@Component({
	selector: 'accueil',
	templateUrl: './accueil.html',
	styleUrls: ['./accueil.scss']
})
export class Accueil implements OnInit {
	utilisateur: Utilisateur;

	constructor(private authService: AuthService) {
	}

	ngOnInit(): void {
		this.utilisateur = this.authService.recupererUtilisateurConnecte();
	}


}
