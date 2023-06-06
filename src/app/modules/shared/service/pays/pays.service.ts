import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pays } from '../../model/pays/pays.model';
import { Observable } from 'rxjs';
import { urls } from '../urls';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  constructor(private http:HttpClient) {}
  
  /**
  *recuperation la liste des fabricants
  *@return fabricant[]
  */
  
  recupererPays():Observable<Pays[]> {
    return this.http.get<Pays[]>(urls.pays + '/lister')
  }
}
