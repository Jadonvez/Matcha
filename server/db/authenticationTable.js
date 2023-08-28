function createAuthenticationTable(pool) {
	return pool.query(`
	CREATE TABLE IF NOT EXISTS authentication (
		uid uuid PRIMARY KEY,
		token VARCHAR(128) NOT NULL,
		user_uid uuid NOT NULL,
		created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
		CONSTRAINT fk_user FOREIGN KEY(user_uid) REFERENCES users(uid)
		)
	`);
}

module.exports = createAuthenticationTable;
