const crypto = require("crypto");

class Like {
	constructor(user_uid, liked_uid) {
		this.user_uid = user_uid;
		this.liked_uid = liked_uid;
		this.uid = crypto.randomUUID();
	}

	get tableName() {
		return "likes";
	}
}

module.exports = Like;
