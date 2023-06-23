import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {urls} from '../urls';
import {Article} from '../../model/article/article';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ArticleService {

	constructor(private http: HttpClient) {
	}

	/**
	 * Récuperation des articles
	 */
	afficherArticle(): Observable<Article[]> {
		return this.http.get<Article[]>(urls.articles);
	}

	/**
	 * creer un article.
	 *
	 * @param article l'article
	 */
	creerArticle(article: Article): Observable<void> {
		return this.http.post<void>(urls.articles, article);
	}

	/**
	 * modifier un article.
	 *
	 * @param article l'article
	 */
	modifierArticle(article: Article): Observable<void> {
		return this.http.put<void>(urls.articles, article);
	}

	/**
	 * recherche un article par identifiant
	 *
	 * @param id l'id de l'article
	 */
	rechercherArticle(id: number): Observable<Article> {
		return this.http.get<Article>(urls.articles + '/' + id);
	}
}
