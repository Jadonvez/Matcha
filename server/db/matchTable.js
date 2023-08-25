function createMatchTable(pool) {
	return pool.query(`
	CREATE TABLE IF NOT EXISTS match (
		id SERIAL PRIMARY KEY,
		uid1 uuid NOT NULL,
		uid2 uuid NOT NULL,
		created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
		)
	`);
}

module.exports = createMatchTable;
