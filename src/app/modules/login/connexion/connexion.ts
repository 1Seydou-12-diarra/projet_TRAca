import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/service/auth.service";
import {Credentials} from "../../shared/model/auth/credentials";
import {NavigationService} from "../../shared/service/navigation.service";
import { Utilisateur } from '../../shared/model/auth/utilisateur.model';

@Component({
	selector: 'app-connexion',
	templateUrl: './connexion.html',
	styleUrls: ['./connexion.scss']
})
export class Connexion {
	constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

  loginForm: FormGroup;
  submitted = false;
  messageActif = false;
  isLoading = false;
  utilisateur: Utilisateur;
  token: string;
  messageErreur: string;

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['tableau-bord'])
    }
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  /**
   * Authentification de l'utilisateur.
   */
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.messageErreur = 'Veuillez';
      this.messageActif = true;
    } else {
      const utilisateur: Credentials = new Credentials(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value
      );
      this.isLoading = true;
      this.messageActif = false;
      this.authService.authentifier(utilisateur).subscribe({
        next: (value) => {
          localStorage.clear();
          const jwtToken = value.token;
          const utilisateur: Utilisateur = this.authService.decoderToken(`${jwtToken}`);
          this.utilisateur = utilisateur;
          this.isLoading = false;
            this.authService.enregistrerToken(`${jwtToken}`);
            this.router.navigate(['main']);
        },
        error: (err) => {
          if (err.status === 403) {
            this.messageErreur = 'Nom d\'utilisateur ou mot de passe incorrect.';
          } else {
            this.messageErreur = 'Serveur indisponible';
          }
          this.messageActif = true;
          this.isLoading = false;
        }
      });
    }
  }
}
