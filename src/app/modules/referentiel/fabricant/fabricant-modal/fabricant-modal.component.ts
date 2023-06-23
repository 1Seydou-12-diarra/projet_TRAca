import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {Message, MessageService, SelectItem} from 'primeng/api';
import {finalize} from 'rxjs';
import {Fabricant} from 'src/app/modules/shared/model/fabricant/fabricant.model';
import {Pays} from 'src/app/modules/shared/model/pays/pays.model';
import {FabricantService} from 'src/app/modules/shared/service/fabricant/fabricant.service';
import {PaysService} from 'src/app/modules/shared/service/pays/pays.service';

@Component({
	selector: 'fabricant-modal',
	templateUrl: './fabricant-modal.component.html',
	styleUrls: ['./fabricant-modal.component.scss'],
})
export class FabricantModal implements OnInit {
	pays: Pays[];
	@Input() visible: boolean;
	@Input() idFabricant: number;
	@Output() visibleChange: EventEmitter<any> = new EventEmitter();
	@Output() enregistrementReussie: EventEmitter<void> = new EventEmitter();

	fabricantForm: FormGroup;
	fabricant: Fabricant;
	modeModification = false;
	enregistrementEnCours: boolean;
	messages: Message[] | undefined;
	chargement: boolean;
	paysOptions: SelectItem[];
	chargementOuverture = false;

	constructor(
		private fabricantService: FabricantService,
		private fb: FormBuilder,
		private messageService: MessageService,
		private paysService: PaysService
	) {}

	ngOnInit() {
		this.initialiserFormulaire();
		this.recupererPays();
	}

	/**
	 * Cette méthode permet d'initialiser le formulaire
	 */
	initialiserFormulaire() {
		this.fabricantForm = this.fb.group({
			code: [{ value: '', disabled: this.modeModification }, [Validators.required]],
			designation: [{ value: '', disabled: false }, [Validators.required]],
			pays: [{ value: '', disabled: false }, [Validators.required]],
		});
	}

	/**
	 * Méthode déclenchée à la fermeture
	 */
	onFermeture() {
		this.fabricantForm.reset();
		this.visibleChange.emit();
		this.fabricantForm.get('code').enable();
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
	 * Méthode déclenchée à l'ouverture de la modale
	 */
	onOuverture():void {
		this.modeModification = !!this.idFabricant;
		if (this.modeModification) {
			this.chargementOuverture = true;
			this.fabricantService
				.rechercherFabricant(this.idFabricant)
				.pipe(finalize(()=>(this.chargement = false)))
				.subscribe({
					next: (fabricant) => {
						this.fabricantForm.patchValue(fabricant);
						if (this.modeModification) {
							this.fabricantForm.get('code').disable();
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
	 * recuperer tous les pays pendant l'insertion d'un fabricant
	 */
	recupererPays(): void {
		this.chargement = true;
		this.paysService
			.recupererPays()
			.pipe(finalize(() => (this.chargement = false)))
			.subscribe({
				next: (data) => {
					this.pays = data;
					this.paysOptions = this.pays.map((pays) => {
						return {
							label: pays.designation,
							value: pays,
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
	 * creer ou modifier un fabricant
	 */
	enregistrer() {
		const fabricant = new Fabricant(
			this.fabricantForm.getRawValue()
		);
		this.chargement = true;
		this.messages = [];
		const enregistrer$ = this.modeModification ? this.fabricantService
			.modifierFabricant(fabricant, this.idFabricant) : this.fabricantService
			.creerFabricant(fabricant);

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

}
