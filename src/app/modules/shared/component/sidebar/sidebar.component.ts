import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {NavbarData} from './nav-data';
import {INavBarData} from './helper';
import {NavigationService} from '../../service/navigation.service';

interface SideNavToggle {
	screenwidth: number;
	collapsed: boolean;
}

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({opacity: 0}),
				animate('350ms',
					style({opacity: 1})
				)
			]),
			transition(':leave', [
				style({opacity: 1}),
				animate('350ms',
					style({opacity: 0})
				)
			])
		])
	]
})
export class SidebarComponent implements OnInit {

	@Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
	collapsed = true;
	screenwidth = 0;
	navData = NavbarData;
	multiple = false;
	role = '';
	nom: string;
	prenoms: string;

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.screenwidth = window.innerWidth;
		if (this.screenwidth <= 768) {
			this.collapsed = false;
			this.onToggleSideNav.emit({collapsed: this.collapsed, screenwidth: this.screenwidth});
		}
	}

	constructor(private navigationService: NavigationService) {
	}

	ngOnInit(): void {
		this.screenwidth = window.innerWidth;
	}

	toggleCollapse(): void {
		this.collapsed = !this.collapsed;
		this.onToggleSideNav.emit({collapsed: this.collapsed, screenwidth: this.screenwidth});
	}

	toggleAdminItems(): void {
		if (!this.collapsed) {
			this.collapsed = true;
			this.onToggleSideNav.emit({collapsed: this.collapsed, screenwidth: this.screenwidth});
		}
	}

	handleClick(item: INavBarData): void {
		if (!this.multiple) {
			for (const modelItem of this.navData) {
				if (item !== modelItem && modelItem.expanded) {
					modelItem.expanded = false;
				}
			}
		}
		item.expanded = !item.expanded;
	}

	/**
	 * Méthode de déconnection
	 * @constructor
	 */
	deconnecter(): void {
		localStorage.clear();
		this.navigationService.goToConnexion();
	}

	/**
	 * Retourne true si on est sur l'un des onglets du menu résultat.
	 */
	isResultat(): boolean {
		return this.navigationService.isResultat() || this.navigationService.isResultatsDetailles();
	}
}
