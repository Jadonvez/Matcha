const pool = require("../db");
const QueryBuilder = require("../utils/queryBuilder");

class UserTagRepository {
	static tableName = "user_tag";

	static createMany = async (userTags) => {
		try {
			const ret = await pool.query(QueryBuilder.createMany(userTags));
			return ret.rowCount >= 1;
		} catch (err) {
			throw err;
		}
	};

	static deleteByUserUid = async (userUid) => {
		try {
			const ret = await pool.query(
				QueryBuilder.relationDelete(this.tableName, "user_uid", userUid)
			);
			return ret.rowCount >= 1;
		} catch (err) {
			throw err;
		}
	};
}

module.exports = UserTagRepository;
