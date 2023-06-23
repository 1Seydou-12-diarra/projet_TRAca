import { Marque } from "../marque/marque";
import { Fabricant } from "../fabricant/fabricant.model";

export class Articles {
	id?: number;
	code?: string;
	designation?: String;
	marque?: Marque;
	fabricant?: Fabricant;
}
