const crypto = require("crypto");

class User {
	constructor(
		login,
		mail,
		name,
		firstname,
		password,
		dob,
		gender,
		orientation
	) {
		this.login = login;
		this.mail = mail;
		this.name = name;
		this.firstname = firstname;
		this.password = password;
		this.dob = dob;
		this.gender = gender;
		this.orientation = orientation;
		this.uid = crypto.randomUUID();
	}

	get tableName() {
		return "users";
	}
}

module.exports = User;
