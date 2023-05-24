import { CommissionLocale } from './commission-locale';
import { Circonscription } from 'src/app/modules/shared/model/circonscription';
import { CodeDesignation } from 'src/app/modules/shared/model/code-designation';

export class Participations {
	region: Circonscription;
	commissionLocale: CommissionLocale;
	bureauVote?: CodeDesignation;
	lieuVote?: CodeDesignation;
	nombreInscrits: number;
	totalParticipants: number;
	tauxParticipation: number;
}








