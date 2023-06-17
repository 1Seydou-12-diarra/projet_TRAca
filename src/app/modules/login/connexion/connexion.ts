import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/service/auth.service";
import {Credentials} from "../../shared/model/auth/credentials";
import {Utilisateur} from '../../shared/model/auth/utilisateur.model';

@Component({
	selector: 'app-connexion',
	templateUrl: './connexion.html',
	styleUrls: ['./connexion.scss']
})
export class Connexion {
	loginForm: FormGroup;
	submitted = false;
	messageActif = false;
	chargement = false;
	utilisateur: Utilisateur;
	token: string;
	messageErreur: string;

	constructor(private formBuilder: FormBuilder,
				private router: Router,
				private authService: AuthService) {
	}

	ngOnInit() {
		if (this.authService.isAuthenticated()) {
			this.router.navigate(['accueil'])
		}
		this.loginForm = new FormGroup({
			'username': new FormControl('', Validators.required),
			'password': new FormControl('', Validators.required)
		});
	}

	/**
	 * Authentifie l'utilisateur
	 */
	connexion() {
		this.submitted = true;
		if (this.loginForm.invalid) {
			this.messageErreur = 'Veuillez renseigner vos identifiants';
			this.messageActif = true;
		} else {
			const utilisateur = new Credentials(this.loginForm.getRawValue());
			this.chargement = true;
			this.messageActif = false;

			this.authService.authentifier(utilisateur).subscribe({
				next: (value) => {
					localStorage.clear();
					const jwtToken = value.token;
					this.utilisateur = this.authService.decoderToken(`${jwtToken}`);
					this.chargement = false;
					this.authService.enregistrerToken(`${jwtToken}`);
					this.router.navigate(['accueil']);
				},
				error: (err) => {
					if (err.status === 403) {
						this.messageErreur = 'Nom d\'utilisateur ou mot de passe incorrect.';
					} else {
						this.messageErreur = 'Serveur indisponible';
					}
					this.messageActif = true;
					this.chargement = false;
				}
			});
		}
	}
}
