import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Articles } from 'src/app/modules/shared/model/article/article';
import { Fabricant } from '../../shared/model/fabricant/fabricant.model';
import { Marque } from 'src/app/modules/shared/model/marque/marque';
import { ArticleService } from 'src/app/modules/shared/service/article/article.service';
import { FabricantService } from 'src/app/modules/shared/service/fabricant/fabricant.service';
import { MarqueService } from 'src/app/modules/shared/service/marque/marque.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  article : Articles[];
  marque : Marque;
  fabricant : Fabricant;
  loading: boolean = false;
  submitted: boolean;
  btnText !: any;
  visible !: boolean;
  articleDialog: boolean;

  constructor(
    private marqueService : MarqueService,
    private fabricantService : FabricantService,
    private articleService : ArticleService,
    private primeNgConfig:PrimeNGConfig,
    ){}

      ngOnInit() {
        this.afficheArticle();
        this.recupererTradctionFiltre();
      }

      public recupererTradctionFiltre(): void {

    }

  //Cette fonction permet de récupérer la liste des marques depuis le service
      afficherMarque() {
        this.marqueService.afficherMarques().subscribe({
          next: (reponse: any) => {
            this.marque = reponse;
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      }

   //Cette fonction permet de récupérer la liste des fabricants depuis le service
//Cette fonction permet de récupérer la liste des fabricants depuis le service
	/**
	 *
	 */
      afficheArticle() {
        this.articleService.afficherArticle().subscribe(
          (reponse: any) => {
            console.log(reponse);
            this.article = reponse;
          }
        );
      }
}
