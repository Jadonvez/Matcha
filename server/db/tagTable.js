const fs = require("fs");
const Tag = require("../models/tag.model");
const QueryBuilder = require("../utils/queryBuilder");

function createTagTable(pool) {
	return pool.query(`
	CREATE TABLE IF NOT EXISTS tag (
		uid uuid PRIMARY KEY,
		name VARCHAR(64) NOT NULL,
		category VARCHAR(64) NOT NULL
		)
	`);
}

const populateTagTable = async (pool) => {
	const tableName = "tag";
	const tagsInTable = await pool.query(QueryBuilder.getAll(tableName));
	if (tagsInTable.rows.length > 0) {
		return;
	}
	fs.readFile("resources/tags.json", "utf8", async (err, data) => {
		if (err) {
			console.error(
				"Une erreur s'est produite lors de la lecture du fichier :",
				err
			);
			return;
		}

		try {
			const jsonData = JSON.parse(data);
			const tags = [];

			for (const data of jsonData) {
				const tag = new Tag(data.name, data.category);
				tags.push(tag);
			}
			await pool.query(QueryBuilder.createMany(tags));
			console.log("Tags added in tags table");
		} catch (parseError) {
			console.error(
				"Une erreur s'est produite lors de l'analyse JSON :",
				parseError
			);
		}
	});
};
module.exports = { createTagTable, populateTagTable };
