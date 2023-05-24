import { Circonscription } from 'src/app/modules/shared/model/circonscription';

export class Election {
	code: string;
	designation: string;
	id: number;
	statut: string;
	Enum: any[];
	annee: number;
	circonscription: Circonscription;
}
