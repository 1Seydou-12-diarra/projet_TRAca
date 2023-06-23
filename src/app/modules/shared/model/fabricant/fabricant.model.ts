import { Pays } from "../pays/pays.model";

export class Fabricant{
    id?:number;
    code?:string;
    designation?:string;
	pays ?: Pays
    constructor(fabricant: Partial<Fabricant>) {
		Object.assign(this, fabricant);
	}

}