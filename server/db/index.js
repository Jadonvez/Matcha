const Pool = require("pg").Pool;
require("dotenv").config({ path: "../../.env" });
const createUserTable = require("./userTable");
const createMatchTable = require("./matchTable");
const createLikesTable = require("./likesTable");
const createPictureTable = require("./pictureTable");
const { createTagTable, populateTagTable } = require("./tagTable");
const createUserTagTable = require("./userTagTable");

const pool = new Pool({
	user: process.env.DB_USERNAME,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

createUserTable(pool)
	.then(() => {
		createLikesTable(pool)
			.then()
			.catch((error) => {
				console.error("Error creating table:", error);
				pool.end();
			});
		createPictureTable(pool)
			.then()
			.catch((error) => {
				console.error("Error creating table:", error);
				pool.end();
			});
		createTagTable(pool)
			.then(() => {
				populateTagTable(pool);
				createUserTagTable(pool)
					.then()
					.catch((error) => {
						console.error("Error while creating User Tag relationship:", error);
					});
			})
			.catch((error) => {
				console.error("error creating table:", error);
			});
	})
	.catch((error) => {
		console.error("Error creating table:", error);
		pool.end();
	});

createMatchTable(pool)
	.then()
	.catch((error) => {
		console.error("Error creating table:", error);
		pool.end();
	});

module.exports = pool;
