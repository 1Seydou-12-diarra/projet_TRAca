import {Fabricant} from "../fabricant/fabricant";
import {Marque} from "../marque/marque";

export class Articles {
	id?: number;
	code?: string;
	designation?: String;
	marque?: Marque;
	fabricant?: Fabricant;
}
