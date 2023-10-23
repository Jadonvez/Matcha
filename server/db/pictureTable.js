function createPictureTable(pool) {
	return pool.query(`
		CREATE TABLE IF NOT EXISTS picture(
			uid uuid NOT NULL PRIMARY KEY,
			user_uid uuid NOT NULL,
			index int NOT NULL,
			filename TEXT UNIQUE NOT NULL,
			filepath TEXT NOT NULL,
			mimetype TEXT NOT NULL,
			size BIGINT NOT NULL,
			base64data TEXT NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			CONSTRAINT fk_user FOREIGN KEY(user_uid) REFERENCES users(uid)
		)
	`);
}

module.exports = createPictureTable;
