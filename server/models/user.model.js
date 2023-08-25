const bcrypt = require("bcrypt");
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
		this.password = password /*bcrypt.hashSync(password, 10)*/;
		this.dob = dob;
		this.gender = gender;
		this.orientation = orientation;
		this.uid = crypto.randomUUID();
	}

	get attributs() {
		return "uid, login, mail, name, firstname, password, dob, gender, orientation";
	}

	get values() {
		return `'${this.uid}', '${this.login}', '${this.mail}', '${this.name}', '${this.firstname}', '${this.password}', '${this.dob}', '${this.gender}', '${this.orientation}'`;
	}

	get tableName() {
		return "users";
	}

	get update() {
		return `UPDATE users SET 
					name = '${this.name}',
					firstName = '${this.firstname}',
					gender = '${this.gender}',
					orientation = '${this.orientation}'
					WHERE id = ${this.id}
					`;
	}
}

module.exports = User;
