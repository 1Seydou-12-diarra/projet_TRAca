import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urls } from '../urls';
import { Articles } from '../../model/article/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http :HttpClient) { }

  /**
	 * Récuperation des articles 
	 * @return Articles[]
	 */
  afficherArticle(): Observable<Articles[]> {
		return this.http.get<Articles[]>(urls.articles);
	}

}
