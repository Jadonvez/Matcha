function createUsersTable(pool) {
	return pool.query(`
	CREATE TABLE IF NOT EXISTS users (
		uid uuid PRIMARY KEY,
		login VARCHAR(64) UNIQUE NOT NULL,
		mail VARCHAR(64) UNIQUE NOT NULL,
		name VARCHAR(64) NOT NULL,
		firstname VARCHAR(64) NOT NULL,
		password TEXT NOT NULL,
		dob DATE NOT NULL,
		gender VARCHAR(64) NOT NULL,
		orientation VARCHAR(64) NOT NULL,
		mail_confirm BOOLEAN NOT NULL DEFAULT FALSE,
		mail_confirm_token uuid NOT NULL,
		ppicture TEXT,
		bio TEXT,
		location VARCHAR(128),
		refresh_token TEXT,
		created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
		)
	`);
}

module.exports = createUsersTable;
