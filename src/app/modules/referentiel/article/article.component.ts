import {Component, OnInit} from '@angular/core';
import {Article} from 'src/app/modules/shared/model/article/article';
import {MessageService} from 'primeng/api';
import {ArticleService} from 'src/app/modules/shared/service/article/article.service';
import {finalize} from "rxjs";

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit{
	idArticle: number;
	article: Article;
	articles: Article[] = [];
	articleSelectionne: Article;
	articleDialogVisible: boolean;
	chargement: boolean;

	constructor(private articleService: ArticleService,
				private messageService: MessageService) {
	}

	ngOnInit(): void {
		this.afficherArticles();
	}

	/**
	 * Affiche tous les Articles
	 */
	afficherArticles(): void {
		this.chargement = true;
		this.articleService.afficherArticle()
			.pipe(finalize(() => this.chargement = false))
			.subscribe({
				next: data => {
					this.articles = data;
				},
				error: err => {
					this.messageService.add({
						severity: 'error',
						summary: 'Error',
						detail: err.message,
						sticky: true,
					});
				}
			})
	}

	/**
	 * Cette méthode permet d'ouvrir le modal d'insertion ou modification
	 *
	 * @param article l'article
	 */
	ouvriModal(article?: Article): void {
		this.articleDialogVisible = true;
		this.idArticle = article?.id;
	}
}
