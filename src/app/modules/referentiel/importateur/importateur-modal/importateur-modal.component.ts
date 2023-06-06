import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Importateur } from 'src/app/modules/shared/model/importateur/importateur.model';
import { ImportateurService } from 'src/app/modules/shared/service/importateur/importateur.service';

@Component({
  selector: 'importateur-modal',
  templateUrl: './importateur-modal.component.html',
  styleUrls: ['./importateur-modal.component.scss']
})
export class ImportateurModalComponent {

  @Input() visible:boolean;
  @Input() idImportateur : number;
  @Output() visibleChange: EventEmitter<any> = new EventEmitter();

  importateurForm:FormGroup;
  submitted:boolean;
  importateur : Importateur;
  modeModification = false;

  constructor(
    private importateurService: ImportateurService,
    private fb:FormBuilder,
  ){}

  ngOnInit() {
    this.validationForm();
  }

  /**
	 * Cette méthode permet de fermer le modal d'insertation ou modification
	 * @param importateur
	 */
  fermerModal() {
    this.visibleChange.emit();
    this.visible= false;
    this.submitted = false;
    this.idImportateur = null;
    this.importateurForm.reset();
    this.importateurForm.get('code').enable();
  }

  /**
	 * Cette méthode permet à un utilisateur de ce connecter
	 * @param utilisateur
	 */
  onOuverture(): void {
    this.modeModification = !!this.idImportateur;
    if(this.idImportateur) {   
      this.importateurService.rechercherImportateur(this.idImportateur).subscribe(
        (importateur) => {
          this.importateurForm.patchValue(importateur);
          if(this.modeModification) {
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
  validationForm(){
    this.importateurForm  = this.fb.group({
      code: [{value: '', disabled: this.modeModification}, [Validators.required]],
      designation: new FormControl('', [Validators.required]),
      nomGerant: new FormControl('', [Validators.required]),
      prenomsGerant: new FormControl('', [Validators.required]),
    });
  }

  /**
	 * Cette méthode permet de créer et modifier un importateur
	 * @param importateur
	 */
  creerImportateurs() {
    if(this.idImportateur){
      this.importateurService.modifierImportateur(this.importateurForm.getRawValue(),this.idImportateur).subscribe(
        (importateur) => {
          window.location.reload()
        this.importateurForm.reset();
        }
      )
    }else{
      this.importateurService.creerImportateur(this.importateurForm.getRawValue()).subscribe(
        (data: Importateur) => {
          window.location.reload()
        this.importateurForm.reset();
        }
      );
    }
    
  }

}
