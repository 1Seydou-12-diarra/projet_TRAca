import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {DividerModule} from 'primeng/divider';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {TreeSelectModule} from 'primeng/treeselect';
import {TooltipModule} from "primeng/tooltip";
import {ButtonModule} from "primeng/button";

import {ReferentielRoutingModule} from './referentiel-routing.module';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {EditorModule} from 'primeng/editor';
import {ImportateurModalComponent} from './importateur/importateur-modal/importateur-modal.component';
import {FabricantComponent} from "./fabricant/fabricant.component";
import {ArticleComponent} from "./article/article.component";
import { ConditionnementComponent } from './conditionnement/conditionnement.component';
import {ListeImportateur} from './importateur/liste-importateur';
import { MessagesModule } from 'primeng/messages';

@NgModule({
	declarations: [
		ListeImportateur,
		ImportateurModalComponent,
		FabricantComponent,
		ArticleComponent,
		ConditionnementComponent
	],
	imports: [
		CommonModule,
		ReferentielRoutingModule,
		ToastModule,
		TableModule,
		DialogModule,
		ReactiveFormsModule,
		ButtonModule,
		ToolbarModule,
		TooltipModule,
		EditorModule,
		ReferentielRoutingModule,
		DropdownModule,
		MultiSelectModule,
		SharedModule,
		TableModule,
		PaginatorModule,
		DividerModule,
		InputTextModule,
		DialogModule,
		ReactiveFormsModule,
		TreeSelectModule,
		TooltipModule,
		ButtonModule,
		MessagesModule
	]
})
export class ReferentielModule {
}
