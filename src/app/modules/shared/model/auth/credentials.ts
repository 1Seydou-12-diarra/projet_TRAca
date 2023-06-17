export class Credentials {
	username: string;
	password: string;

	constructor(credentials: Partial<Credentials>) {
		Object.assign(this, credentials);
	}
}
