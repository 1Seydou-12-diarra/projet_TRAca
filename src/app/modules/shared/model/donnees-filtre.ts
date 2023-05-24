import { HttpParams } from '@angular/common/http';

export class DonneesFiltre {
	tour: string;
	annee: number;
	typeScrutin = 'REGIONALE';
	circonscription: string;
	commissionLocale: string;

	static initialiserDonneesFiltres(): DonneesFiltre {
		const donneeFitres: DonneesFiltre = new DonneesFiltre();
		donneeFitres.annee = Number(localStorage.getItem('annee'));
		donneeFitres.tour = localStorage.getItem('tour');
		donneeFitres.circonscription = localStorage.getItem('codeCirconscription');
		donneeFitres.commissionLocale = localStorage.getItem('codeCommissionLocale');
		return donneeFitres;
	}

	/**
	 * Construit les paramètres de la requête HTTP.
	 *
	 * @param annee l'année électorale.
	 * @param tour le tour du scrutin.
	 * @param codeCirconscriptions les codes des circonscriptions.
	 * @param codeCommissionLocales les codes des commissions locales.
	 * @param typeScrutin
	 */
	static construireParametres(annee: number, tour?: string, codeCirconscriptions?: string,
								codeCommissionLocales?: string, typeScrutin = 'REGIONALE'): HttpParams {
		let httpParams = new HttpParams();
		httpParams = httpParams.set('type', typeScrutin);
		if (annee) {
			httpParams = httpParams.set('annee', String(annee));
		}
		if (tour) {
			httpParams = httpParams.set('tour', tour);
		}
		if (codeCirconscriptions) {
			httpParams = httpParams.set('circonscription', codeCirconscriptions);
		}
		if (codeCommissionLocales) {
			httpParams = httpParams.set('commissionLocale', codeCommissionLocales);
		}
		return httpParams;
	}
}
