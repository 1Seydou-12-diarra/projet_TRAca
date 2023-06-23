import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListeImportateur} from './importateur/liste-importateur';
import {ListeFabricant} from "./fabricant/liste-fabricant";
import {ArticleComponent} from './article/article.component';
import {ConditionnementComponent} from './conditionnement/conditionnement.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{path: 'importateur', component: ListeImportateur},
			{path: 'fabricant', component: ListeFabricant},
			{path: 'article', component: ArticleComponent},
			{path: 'conditionnement', component: ConditionnementComponent}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReferentielRoutingModule {
}
