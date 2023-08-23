const Pool = require("pg").Pool;
require("dotenv").config({ path: "../../.env" });

const pool = new Pool({
	user: process.env.DB_USERNAME,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

function createUserTable() {
	return pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      uid UUID PRIMARY KEY,
      login VARCHAR(64) NOT NULL,
      mail VARCHAR(64) NOT NULL,
      name VARCHAR(64) NOT NULL,
      firstname VARCHAR(64) NOT NULL,
      password VARCHAR(64) NOT NULL,
      dob DATE NOT NULL,
      gender VARCHAR(64) NOT NULL,
      orientation VARCHAR(64) NOT NULL
    )
  `);
}

// Exécution de la création de la table
createUserTable()
	.then(() => {
		console.log('Table "users" created');
	})
	.catch((error) => {
		console.error("Error creating table:", error);
		pool.end(); // Ferme la connexion à la base de données en cas d'erreur
	});

module.exports = pool;
