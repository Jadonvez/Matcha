function createLikesTable(pool) {
	return pool.query(`
	CREATE TABLE IF NOT EXISTS likes (
		id SERIAL PRIMARY KEY,
		likerUid uuid NOT NULL,
		likedUid uuid NOT NULL,
		created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
		)
	`);
}

module.exports = createLikesTable;
