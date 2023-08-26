class QueryBuilder {
	static getAll(tableName) {
		return "SELECT * FROM " + tableName;
	}

	static getByUid(tableName, uid) {
		return `SELECT * FROM ${tableName} WHERE uid = '${uid}'`;
	}

	static create(entity) {
		return `INSERT INTO ${entity.tableName} (${entity.attributs}) VALUES (${entity.values})`;
	}

	static delete(tablename, uid) {
		return `DELETE FROM ${tablename} WHERE uid = '${uid}'`;
	}

	static relationDelete(tablename, relationKey, relationUid) {
		return `DELETE FROM ${tablename} WHERE ${relationKey} = '${relationUid}'`;
	}

	static patch(tableName, uid, updates) {
		var setStr = "SET ";
		Object.keys(updates).forEach((key) => {
			setStr += `${key} = '${updates[key]}', `;
		});
		setStr = setStr.slice(0, -2);
		return `UPDATE ${tableName} 
		${setStr}
		WHERE uid = '${uid}'`;
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
