const crypto = require("crypto");

class Match {
	constructor(uid1, uid2) {
		this.uid1 = uid1;
		this.uid2 = uid2;
		this.uid = crypto.randomUUID();
	}

	get attributs() {
		return "uid, uid1, uid2";
	}

	get values() {
		return `'${this.uid}', '${this.uid1}', '${this.uid2}'`;
	}

	get tableName() {
		return "match";
	}
}

module.exports = Match;
