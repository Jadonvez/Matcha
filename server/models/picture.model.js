const crypto = require("crypto");

class Picture {
	constructor(user_uid, index, filename, filepath, mimetype, size, base64data) {
		this.user_uid = user_uid;
		this.index = index;
		this.filename = filename;
		this.filepath = filepath;
		this.mimetype = mimetype;
		this.size = size;
		this.uid = crypto.randomUUID();
		this.base64data = base64data;
	}

	get tableName() {
		return "picture";
	}
}

module.exports = Picture;
