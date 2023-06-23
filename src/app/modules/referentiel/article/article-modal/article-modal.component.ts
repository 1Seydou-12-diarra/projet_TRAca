import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Article} from "../../../shared/model/article/article";
import {ArticleService} from "../../../shared/service/article/article.service";
import {Marque} from "../../../shared/model/marque/marque";
import {FabricantService} from "../../../shared/service/fabricant/fabricant.service";
import {MarqueService} from "../../../shared/service/marque/marque.service";
import {Message, MessageService, SelectItem} from "primeng/api";
import { Fabricant } from 'src/app/modules/shared/model/fabricant/fabricant.model';
import {finalize} from "rxjs";

@Component({
	selector: 'app-article-modal',
	templateUrl: './article-modal.component.html',
	styleUrls: ['./article-modal.component.scss']
})
export class ArticleModalComponent {

	@Input() visible: boolean;
	@Input() idArticle: number;
	@Output() visibleChange: EventEmitter<any> = new EventEmitter();
	@Output() enregistrementReussie: EventEmitter<void> = new EventEmitter();

	articleForm: FormGroup;
	article: Article;
	modeModification = false;
	enregistrementEnCours =false;
	marques?: Marque[];
	fabricants?:Fabricant[];
	messages: Message[] | undefined;
	fabricantOptions: SelectItem[];
	marqueOptions: SelectItem[];
	chargement: boolean;
	chargementOuverture = false;

	constructor(
		private articleService: ArticleService,
		private fabricantService: FabricantService,
		private marqueService: MarqueService,
		private messageService: MessageService,
		private formBuilder: FormBuilder
	) {
	}

	ngOnInit() {
		this.initialiserFormulaire();
		this.afficherFabricant();
		this.afficherMarques();
	}

	/**
	 * Ferme la modale
	 *
	 * @param enregistre un booleen
	 */
	fermerModal(enregistre: boolean) {
		this.visible = false;
		if (enregistre) {
			this.enregistrementReussie.emit();
		}
	}

	/**
	 * Cette méthode se lance lors de la fermeture de la modale
	 */
	onFermeture(){
		this.articleForm.reset();
		this.articleForm.get('code').enable();
		this.visibleChange.emit();
	}

	/**
	 * Cette méthode se lance lors de l'ouverture de la modal
	 */
	onOuverture():void {
		this.modeModification = !!this.idArticle;
		if (this.modeModification) {
			this.chargementOuverture = true;
			this.articleService
				.rechercherArticle(this.idArticle)
				.pipe(finalize(()=>(this.chargement = false)))
				.subscribe({
					next: (article) => {
						this.articleForm.patchValue(article);
						if (this.modeModification) {
							this.articleForm.get('code').disable();
						}
						this.chargementOuverture = false;
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
	 * Cette méthode permet d'initialiser les champs
	 */
	initialiserFormulaire() {
		this.articleForm = this.formBuilder.group({
			code: [{value: '', disabled: this.modeModification}, [Validators.required]],
			designation: new FormControl('', [Validators.required]),
			marque: new FormControl('', [Validators.required]),
			fabricant: new FormControl('', [Validators.required])
		});
	}

	/**
	 * Cette méthode permet de créer et modifier un article
	 */
	enregistrer() {
		const article = new Article(
			this.articleForm.getRawValue()
		);
		this.chargement = true;
		this.messages = [];

		const enregistrer$ = this.modeModification ? this.articleService
			.modifierArticle(article) : this.articleService.creerArticle(article);
		enregistrer$.pipe(finalize(() => this.chargement = false))
			.subscribe({
				next: () => {
					this.fermerModal(true);
					this.messageService.add({
						severity: 'success',
						summary: 'Succès',
						detail: 'Fabricant enregistré avec succès',
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
	 * Cette méthode permet de lister tous les marques
	 */
	afficherMarques(): void {
		this.chargement = true;
		this.marqueService
			.afficherMarques()
			.pipe(finalize(() => (this.chargement = false)))
			.subscribe({
				next: (data) => {
					this.marques = data;
					this.marqueOptions = this.marques.map(marque => {
						return {
							label: marque.designation,
							value: marque
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

	/**
	 * Cette méthode permet de lister tous les fabricants
	 */
	 afficherFabricant(): void {
		this.chargement = true;
		this.fabricantService
			.recupererFabricants()
			.pipe(finalize(() => (this.chargement = false)))
			.subscribe({
				next: (data) => {
					this.fabricants = data;
					console.log(data);
					this.fabricantOptions = this.fabricants.map(fabricant => {
						return {
							label: fabricant.designation,
							value: fabricant
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
