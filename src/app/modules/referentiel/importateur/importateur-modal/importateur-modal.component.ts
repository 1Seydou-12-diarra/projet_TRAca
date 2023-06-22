import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { Importateur } from 'src/app/modules/shared/model/importateur/importateur.model';
import { ImportateurService } from 'src/app/modules/shared/service/importateur/importateur.service';

@Component({
	selector: 'importateur-modal',
	templateUrl: './importateur-modal.component.html',
	styleUrls: ['./importateur-modal.component.scss'],
})
export class ImportateurModalComponent {
	@Input() visible: boolean;
	@Input() idImportateur: number;
	@Output() visibleChange: EventEmitter<any> = new EventEmitter();
	@Output() enregistrementReussie: EventEmitter<void> = new EventEmitter();

	importateurForm: FormGroup;
	submitted: boolean;
	importateur: Importateur;
	modeModification = false;
	enregistrementEnCours: boolean;
	messages: Message[] | undefined;
	chargement: boolean;
	chargementOuverture = false;

	constructor(
		private importateurService: ImportateurService,
		private fb: FormBuilder,
		private messageService: MessageService
	) {}

	ngOnInit() {
		this.initialiserFormulaire();
	}

	/**
	 * Cette méthode se lance lors de la fermeture de la modal
	 */
	onFermeture(): void {
		this.submitted = false;
		this.importateurForm.reset();
		this.visibleChange.emit();
		this.importateurForm.get('code').enable();
	}

	/**
	 * Ferme la modal
	 */
	fermerModal(enregistre: boolean = false) {
		this.visible = false;
		if (enregistre) {
			this.enregistrementReussie.emit();
		}
	}

	onOuverture():void {
		this.modeModification = !!this.idImportateur;
		if (this.modeModification) {
			this.chargementOuverture = true;
			this.importateurService
				.rechercherImportateur(this.idImportateur)
				.pipe(finalize(()=>(this.chargement = false)))
				.subscribe({
					next: (fabricant) => {
						this.importateurForm.patchValue(fabricant);
						if (this.modeModification) {
							this.importateurForm.get('code').disable();
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
	 * Cette méthode permet de verifier les champs
	 */
	initialiserFormulaire() {
		this.importateurForm = this.fb.group({
			code: [
				{ value: '', disabled: this.modeModification },
				[Validators.required],
			],
			designation: new FormControl('', [Validators.required]),
			nomGerant: new FormControl('', [Validators.required]),
			prenomsGerant: new FormControl('', [Validators.required]),
		});
	}

	/**
	 * créer et modifier un importateur
	 */
	enregistrer() {
		const importateur = new Importateur(
			this.importateurForm.getRawValue()
		);
		this.chargement = true;
		this.messages = [];
		const enregistrer$ = this.modeModification ? this.importateurService
			.modifierImportateur(importateur, this.idImportateur) : this.importateurService
			.creerImportateur(importateur);

		enregistrer$.pipe(finalize(() => this.chargement = false))
			.subscribe({
				next: () => {
					this.fermerModal(true);
					this.messageService.add({
						severity: 'success',
						summary: 'Succès',
						detail: 'Importateur enregistré avec succès',
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
