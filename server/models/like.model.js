class Like {
	constructor(likerUid, likedUid) {
		this.likerUid = likerUid;
		this.likedUid = likedUid;
	}
	get attributs() {
		return "likerUid, likedUid";
	}

	get values() {
		return `'${this.likerUid}', '${this.likedUid}'`;
	}

	get tableName() {
		return "like";
	}
}

module.exports = Like;
