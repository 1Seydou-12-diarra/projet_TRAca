import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conditionnement } from '../../model/conditionnement/conditionnement.model';
import { urls } from '../urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConditionnementService {

  constructor(private http: HttpClient) {}
  /** Récuperer la liste des conditionnements.
	 * @return Conditionnement[]
	 */
	recupererConditionnement():Observable<Conditionnement[]> {
	  return this.http.get<Conditionnement[]>(urls.conditionnement);
  }

}
