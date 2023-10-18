import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Article} from "../../../shared/model/article/article"
import {ArticleService} from "../../../shared/service/article/article.service";
import {Message, MessageService, SelectItem} from "primeng/api";
import {ConditionnementService} from "../../../shared/service/conditionnement/conditionnement.service";
import {Conditionnement} from "../../../shared/model/conditionnement/conditionnement.model";
import {finalize} from "rxjs";

@Component({
	selector: 'app-conditionnement-modal',
	templateUrl: './conditionnement-modal.component.html',
	styleUrls: ['./conditionnement-modal.component.scss']
})
export class ConditionnementModalComponent {

	@Input() visible: boolean;
	@Input() idConditionnement: number;
	@Output() visibleChange: EventEmitter<any> = new EventEmitter();
	@Output() enregistrementReussie: EventEmitter<void> = new EventEmitter();

	conditionnementForm: FormGroup;
	article: Article[];
	modeModification = false;
	enregistrementEnCours: boolean;
	articles: Article[];
	articlesOption: SelectItem[];
	messages: Message[] | undefined;
	chargement: boolean;
	chargementOuverture = false;

	constructor(
		private conditionnementService: ConditionnementService,
		private articleService: ArticleService,
		private messageService: MessageService,
		private formBuilder: FormBuilder
	) {
	}

	ngOnInit() {
		this.initialiserFormulaire();
		this.afficherArticle();
	}

	/**
	 * Ferme la modal
	 */
	fermerModal(enregistre: boolean) {
		this.visible = false;
		if (enregistre) {
			this.enregistrementReussie.emit();
		}
	}


	/**
	 * Cette méthode se lance lors de la fermeture de la modal
	 */
	onFermeture(): void {
		this.conditionnementForm.reset();
		this.conditionnementForm.get('code').enable();
		this.visibleChange.emit();
	}

	/**
	 * Cette méthode permet d'initialiser les champs
	 */
	initialiserFormulaire() {
		this.conditionnementForm = this.formBuilder.group({
			id: [],
			code: [{value: '', disabled: this.modeModification}, [Validators.required]],
			designation: new FormControl('', [Validators.required]),
			longueur: new FormControl('', [Validators.required]),
			largeur: new FormControl('', [Validators.required]),
			hauteur: new FormControl('', [Validators.required]),
			nombreElements: new FormControl('', [Validators.required]),
			article: new FormControl('', [Validators.required]),
		});
	}

	/**
	 * Cette méthode se lance lors de l'ouverture de la modal
	 *
	 */
	onOuverture(): void {
		this.modeModification = !!this.idConditionnement;
		if (this.modeModification) {
			this.chargementOuverture = true;
			this.conditionnementService
				.rechercherConditionnement(this.idConditionnement)
				.pipe(finalize(() => (this.chargement = false)))
				.subscribe({
					next: (conditionnement) => {
						this.conditionnementForm.patchValue(conditionnement);
						if (this.modeModification) {
							this.conditionnementForm.get('code').disable();
							this.chargementOuverture = false;
						}
					},
					error: (err) => {
						this.chargementOuverture = false;
						this.messageService.add({
							severity: 'error',
							summary: 'Error',
							detail: err.message,
							sticky: true,
						});
					},
				});
		}
	}

	/**
	 * Cette méthode permet de créer et modifier un conditionnement
	 */
	enregistrer() {
		const conditionnement = new Conditionnement(this.conditionnementForm.getRawValue());
		this.chargement = true;
		this.messages = [];
		// this.enregistrementEnCours = true;

		const enregistrer$ = this.modeModification ? this.conditionnementService
			.modifierConditionnement(conditionnement) : this.conditionnementService
			.creerConditionnement(conditionnement);
		enregistrer$.pipe(finalize(() => this.chargement = false))
			.subscribe({
				next: () => {
					this.fermerModal(true);
					this.messageService.add({
						severity: 'success',
						summary: 'Succès',
						detail: 'Conditionnement enregistré avec succès',
						life: 3000,
					});
				},
				error: (err) => {
					this.messages = [
						{
							severity: 'error',
							summary: 'Error',
							detail: err.message
						}
					];
				}
			});
	}

	/**
	 * Permet de récuperer les articles
	 */
	afficherArticle(): void {
		this.chargement = true;
		this.articleService
			.afficherArticle()
			.pipe(finalize(() => (this.chargement = false)))
			.subscribe({
				next: (data) => {
					this.articles = data;
					this.articlesOption = this.articles.map(article => {
						return {
							label: article.designation,
							value: article
						};
					});
				},
				error: (err) => {
					this.messageService.add({
						severity: 'error',
						summary: 'Error',
						detail: err.message,
						sticky: true,
					});
				},
			});
	}
}
