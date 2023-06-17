import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {urls} from './urls';
import {Token} from '../model/auth/token';
import {Credentials} from '../model/auth/credentials';
import {Utilisateur} from '../model/auth/utilisateur.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private jwtToken: string;
	private utilisateur: Utilisateur;

	constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
	}

	/**
	 * Cette méthode permet à un utilisateur de ce connecter
	 * @param utilisateur
	 */
	authentifier(utilisateur: Credentials): Observable<Token> {
		return this.http.post<Token>(urls.connexion, utilisateur);
	}

	/**
	 * Cette méthode permet d'enregistrer le token dans le localStorage après l'authentification
	 * @param jwtToken
	 */
	enregistrerToken(jwtToken: string): void {
		this.jwtToken = jwtToken;
		localStorage.setItem('token', jwtToken);
	}

	/**
	 * Cette méthode permet de recuperer le token dans le localStorage après l'authentification
	 */
	recupererToken(): string {
		const token = localStorage.getItem('token');
		return token ? token : '';
	}

	/**
	 *
	 */
	isAuthenticated(): boolean {
		const token = this.recupererToken();
		if (token) {
			return !this.jwtHelper.isTokenExpired(token);
		}
		return false;
	}


	/**
	 * Décode le jwt token.
	 *
	 * @param jwtToken le token jwt.
	 */
	decoderToken(jwtToken: string) {
		const token = this.jwtHelper.decodeToken(jwtToken);
		const utilisateur = new Utilisateur();
		utilisateur.id = token.id;
		utilisateur.nom = token.nom;
		utilisateur.prenoms = token.prenoms;
		utilisateur.username = token.username;
		utilisateur.role = token.role;
		return utilisateur;
	}

	/**
	 * Récupère l'utilisateur connecté
	 */
	recupererUtilisateurConnecte(): Utilisateur {
		if (this.utilisateur) {
			return this.utilisateur;
		} else {
			this.utilisateur = this.decoderToken(this.recupererToken());
			return this.utilisateur;
		}
	}
}
