const pool = require("../db");
const QueryBuilder = require("../queries");

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

	static getById = async (id) => {
		try {
			const user = await pool.query(QueryBuilder.getById(this.tableName, id));
			return user.rows;
		} catch (err) {
			throw err;
		}
	};

	static getByUid = async (uid) => {
		try {
			const user = await pool.query(QueryBuilder.getByUid(this.tableName, uid));
			return user.rows;
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

	static delete = async (id) => {
		try {
			const ret = await pool.query(QueryBuilder.delete(this.tableName, id));
			return ret.rowCount == 1;
		} catch (err) {
			throw err;
		}
	};

	static update = async (user) => {
		console.log(QueryBuilder.update(user));
		try {
			const ret = await pool.query(QueryBuilder.update(user));
			console.log(ret);
			return ret.rowCount == 1;
		} catch (err) {
			throw err;
		}
	};
}

module.exports = UserRepository;
