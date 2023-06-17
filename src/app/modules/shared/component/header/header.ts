import {Component, Input} from '@angular/core';


@Component({
	selector: 'app-header',
	templateUrl: './header.html',
	styleUrls: ['./header.scss']
})

export class Header {
	@Input() collapsed = true;
	@Input() screenWidth = 0;

	constructor() {
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
}
