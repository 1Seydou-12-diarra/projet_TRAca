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
  /** Récuperer la liste des importateurs.
	 * @return Importateur[]
	 */
	recupererImportateur():Observable<Importateur[]> {
	  return this.http.get<Importateur[]>(urls.importateur + '/lister');
  }
  
}
