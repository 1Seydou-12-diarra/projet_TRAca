import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImportateurComponent} from './importateur/importateur.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{path: 'importateur', component: ImportateurComponent}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReferentielRoutingModule {
}
