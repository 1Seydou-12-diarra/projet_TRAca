export class Importateur {
	id?: number;
	code?: string;
	designation?: string;
	nomGerant?: string;
	prenomsGerant?: string;

	constructor(importateur: Partial<Importateur>) {
		Object.assign(this, importateur);
	}
}

