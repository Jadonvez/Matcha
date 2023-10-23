const pool = require("../db");
const QueryBuilder = require("../utils/queryBuilder");

class TagRepository {
	static tableName = "tag";
	static linkTableName = "user_tag";
	static relatedTableName = "user";

	static getAll = async () => {
		try {
			const tags = await pool.query(QueryBuilder.getAll(this.tableName));
			return tags.rows;
		} catch (err) {
			throw err;
		}
	};

	static getByUserUid = async (userUid) => {
		try {
			const tags = await pool.query(
				QueryBuilder.getManyToMany(
					this.tableName,
					this.linkTableName,
					this.relatedTableName,
					userUid
				)
			);
			return tags.rows;
		} catch (err) {
			throw err;
		}
	};
}

module.exports = TagRepository;
