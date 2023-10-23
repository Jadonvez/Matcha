const pool = require("../db");
const QueryBuilder = require("../utils/queryBuilder");

class UserRepository {
	static tableName = "users";

	static getAll = async () => {
		try {
			const users = await pool.query(QueryBuilder.getAll(this.tableName));
			return users.rows;
		} catch (err) {
			throw err;
		}
	};

	static getByUid = async (uid) => {
		try {
			const user = await pool.query(QueryBuilder.getByUid(this.tableName, uid));
			return user.rows[0];
		} catch (err) {
			throw err;
		}
	};

	static getByMail = async (mail) => {
		try {
			const user = await pool.query(
				QueryBuilder.getByKey(this.tableName, "mail", mail)
			);
			return user.rows[0];
		} catch (err) {
			throw err;
		}
	};

	static create = async (user) => {
		try {
			const ret = await pool.query(QueryBuilder.create(user));
			return ret.rowCount == 1;
		} catch (err) {
			throw err;
		}
	};

	static delete = async (uid) => {
		try {
			const ret = await pool.query(QueryBuilder.delete(this.tableName, uid));
			return ret.rowCount == 1;
		} catch (err) {
			throw err;
		}
	};

	static patch = async (uid, updates) => {
		try {
			const ret = await pool.query(
				QueryBuilder.patch(this.tableName, uid, updates)
			);
			return ret.rowCount == 1;
		} catch (err) {
			throw err;
		}
	};
}

module.exports = UserRepository;
