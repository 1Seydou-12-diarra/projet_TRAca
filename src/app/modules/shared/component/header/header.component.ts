import {Component, Input} from '@angular/core';
import {Election} from '../../model/scrutin';
import {Circonscription} from 'src/app/modules/shared/model/circonscription';
import {SelectItem} from 'primeng/api';
import {DonneesFiltre} from '../../model/donnees-filtre';
import {NavigationService} from '../../service/navigation.service';
import {FiltreService} from '../../service/filtre.service';

import {CommissionLocale} from '../../model/commission-locale';
import {CodeDesignation} from '../../model/code-designation';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
	scrutins: Election[];
	election: Election;
	circonscriptions: Circonscription[];
	choixFiltreRegion: SelectItem[];
	circonscriptionSelectionnees: Circonscription[];
	optionsFiltreCirconscription: SelectItem[];
	commissionLocales: CommissionLocale[];
	optionsFiltreCommissionLocale: SelectItem[];
	commissionLocaleSelectionnees: CommissionLocale[];
	annees: number[];
	anneeSelectionnee: number;
	tours: CodeDesignation[] = [];
	tourSelectionne: CodeDesignation;
	idRegions: string;
	loading = false;
	@Input() collapsed = true;
	@Input() screenWidth = 0;
	donneeFitres: DonneesFiltre = DonneesFiltre.initialiserDonneesFiltres();

	constructor(private navigationService: NavigationService,
	            private filtreService: FiltreService) {
	}

	ngOnInit(): void {
		this.filtreService.filtreChange.next(this.donneeFitres);
	}

	public recupererClassBody(): string {
		let styleclass = '';
		if (this.collapsed && this.screenWidth > 768) {
			styleclass = 'body-trimmed';
		} else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
			styleclass = 'body-md-screen';
		}
		return styleclass;
	}

	/**
	 * Récupère la liste des années électorales.
	 */
	// public recupererAnnee(isRefresh = false): void {
	// 	this.electionService.recupererAnneeScrutin().subscribe({
	// 		next: (annees) => {
	// 			this.annees = annees.sort().reverse();
	// 			if (this.donneeFitres.annee && isRefresh) {
	// 				this.anneeSelectionnee = this.donneeFitres.annee;
	// 			} else if (this.annees?.length === 1) {
	// 				this.anneeSelectionnee = this.annees[0];
	// 			}
	// 			if (this.anneeSelectionnee) {
	// 				this.recupererTourScrutinParAnnee(isRefresh);
	// 			}
	// 		}
	// 	});
	// }

	/**
	 * Récupère le tour (1e, 2e, 3e etc...) du scrutin en cour.
	 */
	// public recupererTourScrutinParAnnee(isRefresh = false): void {
	// 	this.electionService.recupererTourScrutinParAnnee(this.anneeSelectionnee).subscribe({
	// 		next: (data) => {
	// 			this.tours = data;
	// 			if (this.donneeFitres.tour?.length && isRefresh) {
	// 				this.tourSelectionne = this.tours.find(tour => tour.code === this.donneeFitres.tour);
	// 			} else if (this.tours.length === 1) {
	// 				this.tourSelectionne = this.tours[0];
	// 			}
	// 			if (this.anneeSelectionnee) {
	// 				if (this.donneeFitres.circonscription?.length && isRefresh) {
	// 					this.circonscriptionSelectionnees = this.circonscriptions?.filter(r => this.donneeFitres.circonscription.split(',')
	// 							.includes(r.code.toString()));
	// 				} else if (this.circonscriptions?.length === 1) {
	// 					this.circonscriptionSelectionnees = this.circonscriptions;
	// 				}
	// 				if (this.tourSelectionne) {
	// 					this.recupererCirconscription(isRefresh);
	// 				}
	// 			}
	// 		}
	// 	});
	// }

	/**
	 * Récupère la liste des circonscriptions
	 */
	// public recupererCirconscription(isRefresh = false): void {
	// 	this.circonscriptionService.recupererCirconscription(this.anneeSelectionnee, this.tourSelectionne).subscribe({
	// 		next: (data) => {
	// 			this.circonscriptions = data;
	// 			this.circonscriptions?.sort((c1, c2) => c1.designation.localeCompare(c2.designation));
	// 			this.optionsFiltreCirconscription = this.construireOptionfiltres(this.circonscriptions);
	// 			if (this.anneeSelectionnee && this.tourSelectionne) {
	// 				if (this.donneeFitres.circonscription?.length && isRefresh) {
	// 					this.circonscriptionSelectionnees = this.circonscriptions.filter(c => this.donneeFitres.circonscription.split(',')
	// 							.includes(c.code.toString()));
	// 				} else if (this.circonscriptions?.length === 1) {
	// 					this.circonscriptionSelectionnees = this.circonscriptions;
	// 				}
	// 			}
	// 			if (this.circonscriptionSelectionnees?.length) {
	// 				this.recupererCommissionLocales(isRefresh);
	// 			}
	// 		}
	// 	});
	// }
	/**
	 * Récupère la liste des commissions électorales locales.
	//  */
	// recupererCommissionLocales(isRefresh = false): void {
	// 	const codeCirconscriptions = this.circonscriptionSelectionnees?.map(c => c.code).join(',');
	// 	this.commissionLocaleService.recupererCommissionLocale(codeCirconscriptions).subscribe(
	// 			(data) => {
	// 				this.commissionLocales = data.sort();
	// 				this.optionsFiltreCommissionLocale = this.construireOptionfiltres(this.commissionLocales);
	// 				if (this.anneeSelectionnee && this.circonscriptionSelectionnees?.length) {
	// 					if (this.donneeFitres.commissionLocale?.length && isRefresh) {
	// 						this.commissionLocaleSelectionnees = this.commissionLocales.filter(c => this.donneeFitres.commissionLocale.split(',')
	// 								.includes(c.code.toString()));
	// 					} else if (this.commissionLocales.length === 1) {
	// 						this.commissionLocaleSelectionnees = this.commissionLocales;
	// 					}
	// 				}
	// 			}
	// 	);
	// }

	/**
	 * Se déclenche lorsqu'une année est selectionnée
	 */
	// public onSelectionAnnee(): void {
	// 	this.circonscriptionSelectionnees = [];
	// 	this.commissionLocaleSelectionnees = [];
	// 	this.tours = [];
	// 	this.tourSelectionne = undefined;
	// 	if (this.anneeSelectionnee) {
	// 		this.recupererTourScrutinParAnnee();
	// 	}
	// }

	/**
	 * Se déclenche quand un tour (1e, 2e, 3e etc...) est sélectionné
	 */
	// onSelectionTour(): void {
	// 	this.circonscriptions = [];
	// 	this.circonscriptionSelectionnees = [];
	// 	this.commissionLocales = [];
	// 	this.commissionLocaleSelectionnees = [];
	// 	this.recupererCirconscription(true);
	// }
	//
	// /**
	//  * Se déclenche lorsqu'une region est selectionnée
	//  */
	// public onSelectionCirconscription(): void {
	// 	this.commissionLocaleSelectionnees = [];
	// 	this.commissionLocales = [];
	// 	if (this.circonscriptionSelectionnees?.length) {
	// 		this.recupererCirconscription();
	// 	}
	// }

	/**
	 * Stocker les valeurs pour les filtres globaux.
	 */
	public stockerFiltresLocalStorage(): void {
		localStorage.setItem('annee', this.anneeSelectionnee?.toString());
		localStorage.setItem('tour', this.tourSelectionne.code);
		localStorage.setItem('codeCirconscription', this.circonscriptionSelectionnees ?
			this.circonscriptionSelectionnees.map(c => c.code.toString()).join(',') : '');
		localStorage.setItem('codeCommissionLocale', this.commissionLocaleSelectionnees ?
			this.commissionLocaleSelectionnees.map(c => c.code.toString()).join(',') : '');
	}

	/**
	 * Cette fonction permet de valider les filtres
	 */
	public validerfiltre(): void {
		const donneesFiltre = new DonneesFiltre();
		donneesFiltre.annee = this.anneeSelectionnee;
		donneesFiltre.tour = this.tourSelectionne.code;
		donneesFiltre.circonscription = this.circonscriptionSelectionnees?.map(r => r.code).join(',');
		donneesFiltre.commissionLocale = this.commissionLocaleSelectionnees?.map(c => c.code).join(',');
		this.filtreService.filtreChange.next(donneesFiltre);
		this.stockerFiltresLocalStorage();
	}

	/**
	 * Permet de vider toutes les valeurs des filtres
	 */
	// viderfiltre(): void {
	// 	this.anneeSelectionnee = null;
	// 	this.circonscriptionSelectionnees = [];
	// 	this.commissionLocaleSelectionnees = [];
	// 	localStorage.removeItem('annee');
	// 	localStorage.removeItem('tour');
	// 	localStorage.removeItem('codeCommissionLocale');
	// 	localStorage.removeItem('codeCirconscription');
	// 	if (this.annees?.length === 1) {
	// 		this.anneeSelectionnee = this.annees[0];
	// 		this.validerfiltre();
	// 		this.onSelectionAnnee();
	// 		}
	// }

	/**
	 * Contruit les options d'un multiselect.
	 * @param data la liste des données source.
	 */
	construireOptionfiltres(data: any[]): SelectItem[] {
		return data?.map(objet => {
			return {
				code: objet.code,
				value: objet.designation,
				id: objet.id
			};
		});
	}

	/**
	 * Retourne true si l'utilisateur est sur la vue résultat détaillée.
	 * @return boolean
	 */
	isResultatsDetailles(): boolean {
		return this.navigationService.isResultatsDetailles();
	}

	/**
	 * Retourne true si l'utilisateur est sur la vue carte interactive.
	 * @return boolean
	 */
	isCarteInteractive(): boolean {
		return this.navigationService.isCarteInteractive();
	}

	/**
	 * Retourne true s'il faute désactiver le bouton de recherche.
	 * @return boolean
	 */
	desactiverBoutonFiltre(): boolean {
		return ((!this.anneeSelectionnee || !this.tourSelectionne) && !this.isResultatsDetailles()) ||
			((!this.anneeSelectionnee || !this.tourSelectionne || !this.circonscriptionSelectionnees?.length ||
				this.commissionLocaleSelectionnees?.length !== 1) && this.isResultatsDetailles());
	}
}
