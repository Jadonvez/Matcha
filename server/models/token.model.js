class Token {
	constructor(token, userUid) {
		this.token = token;
		this.userUid = userUid;
	}

	get attributs() {
		return "token, userUid";
	}

	get values() {
		return `'${this.token}', '${this.userUid}'`;
	}

	get tableName() {
		return "token";
	}
}

module.exports = Token;
