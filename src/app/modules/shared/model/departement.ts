import { Circonscription } from 'src/app/modules/shared/model/circonscription';
import { CodeDesignation } from './code-designation';

export class Departement extends CodeDesignation {
	id: number;
	region: Circonscription;
}
