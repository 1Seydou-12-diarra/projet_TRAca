import {INavBarData} from './helper';

export const NavbarData: INavBarData[] = [
	{
		routerlink: 'accueil',
		icon: 'pi pi-home',
		label: 'Accueil',
		items: []
	},
	{
		routerlink: 'code',
		icon: 'pi pi-qrcode',
		label: 'Code',
		items: []
	},
	{
		routerlink: 'referentiel',
		icon: 'pi pi-sliders-h',
		label: 'Référentiel',
		expanded: false,
		items: [
			{
				routerlink: 'referentiel/importateur',
				label: "Importateur",
				icon: 'pi pi-chart-line'
			},
			{
				routerlink: 'referentiel/fabricant',
				label: "Fabricant",
				icon: 'pi pi-home'
			},
			{
				routerlink: 'referentiel/article',
				label: "Article",
				icon: 'pi pi-chart-line'
			},
			{
				routerlink: 'referentiel/conditionnement',
				label: "Conditionnement",
				icon: 'pi pi-code'
			}
		]
	}
];
