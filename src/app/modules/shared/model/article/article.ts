import { Marque } from "../marque/marque";
import { Fabricant } from "../fabricant/fabricant.model";

export class Article {
    id :number;
    code :string;
    designation : string;
    marque :Marque;
    fabricant : Fabricant;

	constructor(article: Partial<Article>) {
		Object.assign(this, article);
	}
}
