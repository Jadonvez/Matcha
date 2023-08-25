class QueryBuilder {
	static getAll(tableName) {
		return "SELECT * FROM " + tableName;
	}

	static getById(tableName, id) {
		return `SELECT * FROM ${tableName} WHERE id = ${id}`;
	}

	static getByUid(tableName, uid) {
		return `SELECT * FROM ${tableName} WHERE uid = '${uid}'`;
	}

	static create(entity) {
		return `INSERT INTO ${entity.tableName} (${entity.attributs}) VALUES (${entity.values})`;
	}

	static delete(tablename, id) {
		return `DELETE FROM ${tablename} WHERE id = ${id}`;
	}

	static update(entity) {
		return entity.update;
	}

	static getUsers = "SELECT * FROM users";
	static getUsersById = "SELECT * FROM users WHERE id = $1";
	static getUsersByUid = "SELECT * FROM users WHERE uid = $1";
	static checkMailExists = "SELECT s FROM users s WHERE s.mail = $1";

	static checkMailPasswordExists =
		"SELECT * FROM users WHERE mail = $1 AND password = $2";

	static addUser =
		"INSERT INTO users (name, firstname, mail, password, dob, gender) VALUES ($1, $2, $3, $4, $5, $6)";
	static removeUser = "DELETE FROM users WHERE id = $1";
	static updateUser = "UPDATE users SET bio = $1 WHERE id = $2";
}

module.exports = QueryBuilder;
