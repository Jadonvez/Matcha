const crypto = require("crypto");

class Authentication {
	constructor(token, userUid) {
		this.token = token;
		this.userUid = userUid;
		this.uid = crypto.randomUUID();
	}

	get tableName() {
		return "auth";
	}
}

module.exports = Authentication;
