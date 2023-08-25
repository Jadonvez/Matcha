class Match {
	constructor(uid1, uid2) {
		this.uid1 = uid1;
		this.uid2 = uid2;
	}

	get attributs() {
		return "uid1, uid2";
	}

	get values() {
		return `'${this.uid1}', '${this.uid2}'`;
	}

	get tableName() {
		return "match";
	}
}

module.exports = Match;
