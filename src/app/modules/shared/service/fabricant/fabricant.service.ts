import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Fabricant} from '../../model/fabricant/fabricant.model';
import {Observable} from 'rxjs';
import {urls} from '../urls';

@Injectable({
	providedIn: 'root'
})
export class FabricantService {

	constructor(private http: HttpClient) {
	}

	/**
	 *recuperation la liste des fabricants
	 *
	 *@return fabricant[]
	 */
	recupererFabricants(): Observable<Fabricant[]> {
		return this.http.get<Fabricant[]>(urls.fabricant + '/lister')
	}

	/** creer un fabricant.
	 *
	 * @param id l'id du fabricant
	 * @return  un observable de Fabricant
	 */
	rechercherFabricant(id: number): Observable<Fabricant> {
		return this.http.get<Fabricant>(urls.fabricant + '/' + id)
	}

	/**
	 * creer un fabricant.
	 *
	 * @return un observable
	 */
	creerFabricant(fabricants: Fabricant): Observable<void> {
		console.log(fabricants);
		return this.http.post<void>(urls.fabricant, fabricants);
	}

	/**
	 * modifier un fabricant.
	 *
	 * @param fabricant le fabricant
	 * @param id l'd du fabricant
	 * @return un observable
	 */
	modifierFabricant(fabricant: Fabricant, id: number): Observable<void> {
		return this.http.put<void>(urls.fabricant + '/' + id, fabricant);
	}
}
