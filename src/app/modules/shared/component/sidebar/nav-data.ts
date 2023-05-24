import {INavBarData} from './helper';

export const NavbarData: INavBarData[] = [
	{
		routerlink: 'code',
		icon: 'pi pi-chart-bar',
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
				routerlink: 'resultat/importateur',
				label: "Importateur",
				icon: 'pi pi-chart-line',
			},
			{
				routerlink: 'resultat/fabricant',
				label: "Fabricant",
				icon: 'pi pi-home',
			}
		]
	}
];
