import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urls } from './urls';
import { Circonscription } from 'src/app/modules/shared/model/circonscription';
import { CodeDesignation } from 'src/app/modules/shared/model/code-designation';

@Injectable({
	providedIn: 'root'
})
export class CirconscriptionService {

	constructor(private http: HttpClient) {
	}

	/* Récuperer la liste des circonscriptions.
 @return Departement[]

	recupererCirconscription(annee: number, tour: CodeDesignation): Observable<Circonscription[]> {
		let httpParams = new HttpParams();
		if (annee) {
			httpParams = httpParams.set('annee', String(annee));
		}
		if (tour) {
			httpParams = httpParams.set('tour', String(tour));
		}
		return this.http.get<Circonscription[]>(urls.circonscription + '/lister', { params: httpParams });
	}
*/
	/** Récuperer la liste des circonscriptions.
	 * @return Departement[]
	 */
	recupererCirconscription(annee: number, tour: CodeDesignation): Observable<Circonscription[]> {

		return this.http.get<Circonscription[]>(urls.circonscription + '/lister');
	}
}
