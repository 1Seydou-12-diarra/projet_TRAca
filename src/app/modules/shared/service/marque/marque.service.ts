import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urls } from '../urls';
import { Observable } from 'rxjs';
import { Marque } from '../../model/marque/marque';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  constructor(private http :HttpClient) { }

  /**
	 * Récuperation des marques
	 * @return Marque[]
	 */
  afficherMarques(): Observable<Marque[]> {
		return this.http.get<Marque[]>(urls.marques);
	}
}
