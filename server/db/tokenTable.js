function createTokenTable(pool) {
	return pool.query(`
	CREATE TABLE IF NOT EXISTS token (
		id SERIAL PRIMARY KEY,
		token VARCHAR(64) NOT NULL,
		userUid uuid NOT NULL,
		created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
		)
	`);
}

module.exports = createTokenTable;