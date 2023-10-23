class QueryBuilder {
	static getAll(tableName) {
		return "SELECT * FROM " + tableName;
	}

	static getByUid(tableName, uid) {
		return `SELECT * FROM ${tableName} WHERE uid = '${uid}'`;
	}

	static getByKey(tableName, key, value) {
		return `SELECT * FROM ${tableName} WHERE ${key} = '${this.escapeString(
			value
		)}'`;
	}

	static getByKeyOr(tableName, key1, key2, value) {
		return `SELECT * FROM ${tableName} WHERE ${key1} = '${this.escapeString(
			value
		)}' OR ${key2} = '${this.escapeString(value)}'`;
	}

	static create(entity) {
		var sql = `INSERT INTO ${entity.tableName} (`;
		Object.keys(entity).forEach((key) => {
			sql += `${key}, `;
		});
		sql = sql.slice(0, -2);
		sql += `) VALUES (`;
		Object.keys(entity).forEach((key) => {
			sql += `'${entity[key]}', `;
		});
		sql = sql.slice(0, -2);
		sql += `)`;
		return sql;
	}

	static createMany(entities) {
		var sql = `INSERT INTO ${entities[0].tableName} (`;
		Object.keys(entities[0]).forEach((key) => {
			sql += `${key}, `;
		});
		sql = sql.slice(0, -2);
		sql += `) VALUES `;
		entities.forEach((entity) => {
			sql += `(`;
			Object.keys(entity).forEach((key) => {
				sql += `'${entity[key]}', `;
			});
			sql = sql.slice(0, -2);
			sql += `),`;
		});
		sql = sql.slice(0, -1);
		return sql;
	}

	static delete(tablename, uid) {
		return `DELETE FROM ${tablename} WHERE uid = '${uid}'`;
	}

	static relationDelete(tablename, relationKey, relationUid) {
		return `DELETE FROM ${tablename} WHERE ${relationKey} = '${relationUid}'`;
	}

	static relationDeleteAnd(tablename, relationKey, relationUid, key, value) {
		return `DELETE FROM ${tablename} WHERE ${relationKey} = '${relationUid}' AND ${key} = ${this.escapeString(
			value
		)}`;
	}

	static patch(tableName, uid, updates) {
		var setStr = "SET ";
		Object.keys(updates).forEach((key) => {
			setStr += `${key} = '${this.escapeString(updates[key])}', `;
		});
		setStr = setStr.slice(0, -2);
		return `UPDATE ${tableName} 
		${setStr}
		WHERE uid = '${uid}'`;
	}

	static checkMatch(like) {
		return `SELECT * FROM ${like.tableName} WHERE user_uid = '${like.liked_uid}' AND liked_uid = '${like.user_uid}'`;
	}

	static getManyToMany(tableName, linkTableName, relatedTableName, uid) {
		return `SELECT * FROM ${tableName} 
		JOIN ${linkTableName} ON ${tableName}.uid = ${linkTableName}.${tableName}_uid
		WHERE ${linkTableName}.${relatedTableName}_uid = '${uid}'`;
	}

	static escapeString(str) {
		return str.replace(/'/g, "''");
	}
}

module.exports = QueryBuilder;
