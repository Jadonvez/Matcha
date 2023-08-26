function createLikesTable(pool) {
	return pool.query(`
	CREATE TABLE IF NOT EXISTS likes (
		uid uuid PRIMARY KEY,
		user_uid uuid NOT NULL,
		liked_uid uuid NOT NULL,
		created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
		CONSTRAINT fk_user FOREIGN KEY(user_uid) REFERENCES users(uid)
		)
	`);
}

module.exports = createLikesTable;
