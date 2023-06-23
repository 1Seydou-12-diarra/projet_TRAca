import {Article} from "../article/article";

export class Conditionnement {
	id: number;
	code: string;
	designation: string;
	longueur: number;
	largeur: number;
	hauteur: number;
	nombreElements: number;
	article: Article;

	constructor(conditionnement: Partial<Conditionnement>) {
		Object.assign(this, conditionnement);
	}

}
