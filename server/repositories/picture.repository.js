const pool = require("../db");
const QueryBuilder = require("../utils/queryBuilder");

class PictureRepository {
	static tableName = "picture";
	static userColumn = "user_uid";

	static getByUser = async (userUid) => {
		try {
			const pictures = await pool.query(
				QueryBuilder.getByKey(this.tableName, "user_uid", userUid)
			);
			return pictures.rows;
		} catch (err) {
			throw err;
		}
	};

	static createMany = async (pictures) => {
		try {
			const ret = await pool.query(QueryBuilder.createMany(pictures));
			return ret.rowCount >= 1;
		} catch (err) {
			throw err;
		}
	};

	static deleteAllByUser = async (userUid) => {
		try {
			await pool.query(
				QueryBuilder.relationDelete(this.tableName, this.userColumn, userUid)
			);
			return;
		} catch (err) {
			throw err;
		}
	};

	static deleteByIndexes = async (userUid, indexes) => {
		try {
			indexes.forEach(async (index) => {
				await pool.query(
					QueryBuilder.relationDeleteAnd(
						this.tableName,
						this.userColumn,
						userUid,
						"index",
						index
					)
				);
			});
			return;
		} catch (err) {
			throw err;
		}
	};
}

module.exports = PictureRepository;
