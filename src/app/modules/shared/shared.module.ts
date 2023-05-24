import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { SublevelMenuComponent } from './component/sidebar/sublevel-menu.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { HeaderComponent } from './component/header/header.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReplacePipe } from './pipe/pipe-replace';
import { InputTextModule } from 'primeng/inputtext';
import { MainPageComponent } from './component/main-page/main-page.component';

@NgModule({
	declarations: [
		SidebarComponent,
		SublevelMenuComponent,
		HeaderComponent,
		ReplacePipe,
		MainPageComponent
	],
	exports: [
		SidebarComponent,
		HeaderComponent,
		MainPageComponent,
		ReplacePipe,
		CurrencyPipe,
	],
	imports: [
		CommonModule,
		RouterLinkActive,
		TooltipModule,
		InputTextModule,
		RouterLink,
		RouterOutlet,
		MultiSelectModule,
		DropdownModule,
		ButtonModule,
		RippleModule,
		FormsModule,
		RadioButtonModule
	],
	providers: [
		ReplacePipe,
	]
})
export class SharedModule {}
