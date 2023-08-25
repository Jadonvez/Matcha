function createUsersTable(pool) {
	return pool.query(`
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		uid uuid UNIQUE NOT NULL,
		login VARCHAR(64) UNIQUE NOT NULL,
		mail VARCHAR(64) UNIQUE NOT NULL,
		name VARCHAR(64) NOT NULL,
		firstname VARCHAR(64) NOT NULL,
		password TEXT NOT NULL,
		dob DATE NOT NULL,
		gender VARCHAR(64) NOT NULL,
		orientation VARCHAR(64) NOT NULL,
		mail_confirm BOOLEAN NOT NULL DEFAULT FALSE,
		ppicture TEXT,
		bio TEXT,
		created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
		)
	`);
}

module.exports = createUsersTable;
