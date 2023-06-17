import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Importateur } from '../../model/importateur/importateur.model';
import { urls } from '../urls';

@Injectable({
  providedIn: 'root'
})
export class ImportateurService {
  constructor(private http: HttpClient) {}


	/**
	 * Récupère la liste des importateurs
	 *
	 * @return la liste des importateurs
	 */
	recupererImportateur():Observable<Importateur[]> {
	  return this.http.get<Importateur[]>(urls.importateur + '/lister');
  }

  rechercherImportateur(id: number) :Observable<Importateur> {
	return this.http.get<Importateur>(urls.importateur + '/' + id)
  }

 /** creer un importateur.
	 * @return Importateur
	 */
  creerImportateur(importateurs:Importateur):Observable<Importateur> {
	  return this.http.post<Importateur>(urls.importateur ,importateurs);
  }

   /**modifier un importateur.
	 * @return Importateur
	 */
  modifierImportateur(importateur:Importateur, id:number):Observable<Importateur[]> {
	  return this.http.put<Importateur[]>(urls.importateur + '/' + id ,importateur);
  }



}
