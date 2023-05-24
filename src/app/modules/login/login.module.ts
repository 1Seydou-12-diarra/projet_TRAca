import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Connexion } from './connexion/connexion';
import { LoginRoutingModule } from './login-routing.module';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../shared/service/auth.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
	declarations: [
		Connexion
	],
	imports: [
		CommonModule,
		LoginRoutingModule,
		PasswordModule,
		MessageModule,
		ButtonModule,
		ReactiveFormsModule,
		InputTextModule,
		ProgressSpinnerModule
	],
	providers: [
		AuthService
	]
})
export class LoginModule {}
