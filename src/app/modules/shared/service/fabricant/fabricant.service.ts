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
	 *@return fabricant[]
	 */

	recupererFabricants(): Observable<Fabricant[]> {
		return this.http.get<Fabricant[]>(urls.fabricant + '/lister')
	}

}
