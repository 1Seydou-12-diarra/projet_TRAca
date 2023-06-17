import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Importateur} from 'src/app/modules/shared/model/importateur/importateur.model';
import {ImportateurService} from 'src/app/modules/shared/service/importateur/importateur.service';

@Component({
	selector: 'importateur-modal',
	templateUrl: './importateur-modal.component.html',
	styleUrls: ['./importateur-modal.component.scss']
})
export class ImportateurModalComponent {

	@Input() visible: boolean;
	@Input() idImportateur: number;
	@Output() visibleChange: EventEmitter<any> = new EventEmitter();

	importateurForm: FormGroup;
	submitted: boolean;
	importateur: Importateur;
	modeModification = false;
	enregistrementEnCours: boolean;

	constructor(
		private importateurService: ImportateurService,
		private fb: FormBuilder,
	) {
	}

	ngOnInit() {
		this.initialiserFormulaire();
	}

	/**
	 * Ferme la modal
	 */
	fermerModal() {
		this.visible = false;
	}

	/**
	 * Cette méthode se lance lors de la fermeture de la modal
	 */
	onFermeture(): void {
		this.submitted = false;
		this.idImportateur = null;
		this.importateurForm.reset();
		this.importateurForm.get('code').enable();
		this.visibleChange.emit();
	}

	/**
	 *
	 */
	onOuverture(): void {
		this.modeModification = !!this.idImportateur;
		if (this.idImportateur) {
			this.importateurService.rechercherImportateur(this.idImportateur).subscribe(
				(importateur) => {
					this.importateurForm.patchValue(importateur);
					if (this.modeModification) {
						this.importateurForm.get('code').disable();
					}
				}
			)
		}
	}

	/**
	 * Cette méthode permet de verifier les champs
	 * @param utilisateur
	 */
	initialiserFormulaire() {
		this.importateurForm = this.fb.group({
			code: [{value: '', disabled: this.modeModification}, [Validators.required]],
			designation: new FormControl('', [Validators.required]),
			nomGerant: new FormControl('', [Validators.required]),
			prenomsGerant: new FormControl('', [Validators.required]),
		});
	}

	/**
	 * Cette méthode permet de créer et modifier un importateur
	 */
	creerImportateur() {
		if (this.idImportateur) {
			this.importateurService.modifierImportateur(this.importateurForm.getRawValue(), this.idImportateur).subscribe(
				() => {
					this.fermerModal();
				}
			)
		} else {
			this.importateurService.creerImportateur(this.importateurForm.getRawValue()).subscribe(
				() => {
					this.fermerModal();
				}
			);
		}

	}

}
