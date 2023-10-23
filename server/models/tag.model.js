const crypto = require("crypto");

class Tag {
	constructor(name, category) {
		this.name = name;
		this.category = category;
		this.uid = crypto.randomUUID();
	}

	get tableName() {
		return "tag";
	}
}

module.exports = Tag;
