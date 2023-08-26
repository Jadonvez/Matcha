const crypto = require("crypto");

class Like {
	constructor(userUid, likedUid) {
		this.userUid = userUid;
		this.likedUid = likedUid;
		this.uid = crypto.randomUUID();
	}
	get attributs() {
		return "uid, user_uid, liked_uid";
	}

	get values() {
		return `'${this.uid}', '${this.userUid}', '${this.likedUid}'`;
	}

	get tableName() {
		return "likes";
	}
}

module.exports = Like;
