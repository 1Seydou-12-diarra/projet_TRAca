import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Conditionnement} from '../../model/conditionnement/conditionnement.model';
import {urls} from '../urls';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ConditionnementService {

	constructor(private http: HttpClient) {
	}

	/** Récupère la liste des conditionnements.
	 */
	recupererConditionnement(): Observable<Conditionnement[]> {
		return this.http.get<Conditionnement[]>(urls.conditionnement);
	}

	/**
	 * creer un conditionnement.
	 *
	 * @param conditionnement le conitionnement
	 */
	creerConditionnement(conditionnement: Conditionnement): Observable<void> {
		return this.http.post<void>(urls.conditionnement, conditionnement);
	}


	/**
	 * modifier un conditionnement.
	 *
	 * @param conditionnement le conitionnement
	 */

	modifierConditionnement(conditionnement: Conditionnement): Observable<void> {
		return this.http.put<void>(urls.conditionnement, conditionnement);
	}

	/**
	 * recherche un conditionnement par son id
	 *
	 * @param id l'id du conditionnement
	 */
	rechercherConditionnement(id: number): Observable<Conditionnement> {
		return this.http.get<Conditionnement>(urls.conditionnement + '/' + id);
	}
}
