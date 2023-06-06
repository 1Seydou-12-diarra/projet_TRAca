import { Pays } from "../pays/pays.model";

export class Fabricant{
	id: number;
	code_fabricant: string;
	designation_fabricant: string;
	pays: Pays;
}