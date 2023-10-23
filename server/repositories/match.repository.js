const pool = require("../db");
const QueryBuilder = require("../utils/queryBuilder");

class MatchRepository {
	static tableName = "match";
	static userColumn = "user_uid";

	static getAll = async () => {
		try {
			const matchs = await pool.query(QueryBuilder.getAll(this.tableName));
			return matchs.rows;
		} catch (err) {
			throw err;
		}
	};

	static getAllByUserUid = async (userUid) => {
		try {
			console.log(
				QueryBuilder.getByKeyOr(this.tableName, "uid1", "uid2", userUid)
			);
			const matchs = await pool.query(
				QueryBuilder.getByKeyOr(this.tableName, "uid1", "uid2", userUid)
			);
			return matchs.rows;
		} catch (err) {
			throw err;
		}
	};

	static getByUid = async (uid) => {
		try {
			const match = await pool.query(
				QueryBuilder.getByUid(this.tableName, uid)
			);
			return match.rows[0];
		} catch (err) {
			throw err;
		}
	};

	static create = async (match) => {
		try {
			console.log("match dans repo", match);
			console.log(QueryBuilder.create(match));
			const ret = await pool.query(QueryBuilder.create(match));
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

	static deleteUserRelated = async (userUid) => {
		try {
			await pool.query(
				QueryBuilder.relationDelete(this.tableName, this.userColumn, userUid)
			);
			return;
		} catch (err) {
			throw err;
		}
	};
}

module.exports = MatchRepository;
