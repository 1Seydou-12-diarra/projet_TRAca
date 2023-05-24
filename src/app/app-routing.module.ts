import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './modules/shared/component/main-page/main-page.component';

const routes: Routes = [
	{
		path: 'connexion',
		loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
	},
	{
		path: 'main', component: MainPageComponent,
		children: [
			{
				path: 'code',
				loadChildren: () => import('./modules/code/code.module').then(m => m.CodeModule),
			},
			{
				path: 'referentiel',
				loadChildren: () => import('./modules/referentiel/referentiel.module').then(m => m.ReferentielModule),
			}
		]
	},
	{
		path: '**',
		redirectTo: 'connexion',
		pathMatch: 'full'
	},
	{
		path: '',
		redirectTo: 'connexion',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
