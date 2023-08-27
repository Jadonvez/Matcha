class QueryBuilder {
	static getAll(tableName) {
		return "SELECT * FROM " + tableName;
	}

	static getByUid(tableName, uid) {
		return `SELECT * FROM ${tableName} WHERE uid = '${uid}'`;
	}

	static getByKey(tableName, key, value) {
		return `SELECT * FROM ${tableName} WHERE ${key} = '${value}'`;
	}

	static getByKeyOr(tableName, key1, key2, value) {
		return `SELECT * FROM ${tableName} WHERE ${key1} = '${value}' OR ${key2} = '${value}'`;
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

	static checkMatch(like) {
		return `SELECT * FROM ${like.tableName} WHERE user_uid = '${like.likedUid}' AND liked_uid = '${like.userUid}'`;
	}
}

module.exports = QueryBuilder;
