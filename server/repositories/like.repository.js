const pool = require("../db");
const QueryBuilder = require("../utils/queryBuilder");

class LikeRepository {
	static tableName = "likes";
	static userColumn = "user_uid";

	static getAll = async () => {
		try {
			const likes = await pool.query(QueryBuilder.getAll(this.tableName));
			return likes.rows;
		} catch (err) {
			throw err;
		}
	};

	static getByUid = async (uid) => {
		try {
			const like = await pool.query(QueryBuilder.getByUid(this.tableName, uid));
			return like.rows;
		} catch (err) {
			throw err;
		}
	};

	static create = async (like) => {
		try {
			const ret = await pool.query(QueryBuilder.create(like));
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

	static deleteUserRelated = async (uid) => {
		try {
			const ret = await pool.query(
				QueryBuilder.relationDelete(this.tableName, this.userColumn, uid)
			);
			return;
		} catch (err) {
			throw err;
		}
	};
}

module.exports = LikeRepository;
