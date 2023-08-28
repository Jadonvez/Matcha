const Pool = require("pg").Pool;
require("dotenv").config({ path: "../../.env" });
const createUserTable = require("./userTable");
const createMatchTable = require("./matchTable");
const createLikesTable = require("./likesTable");
const createAuthTable = require("./authenticationTable");

const pool = new Pool({
	user: process.env.DB_USERNAME,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

createUserTable(pool)
	.then(() => {
		console.log("Users table created");
		createLikesTable(pool)
			.then(() => {
				console.log("Likes Table created");
			})
			.catch((error) => {
				console.error("Error creating table:", error);
				pool.end();
			});
		createAuthTable(pool)
			.then(() => {
				console.log("Auth Table created");
			})
			.catch((error) => {
				console.error("Error creating table:", error);
				pool.end();
			});
	})
	.catch((error) => {
		console.error("Error creating table:", error);
		pool.end();
	});

createMatchTable(pool)
	.then(() => {
		console.log("Match Table created");
	})
	.catch((error) => {
		console.error("Error creating table:", error);
		pool.end();
	});

module.exports = pool;
