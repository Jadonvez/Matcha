function createUserTagTable(pool) {
	return pool.query(`
	CREATE TABLE IF NOT EXISTS user_tag (
		user_uid uuid REFERENCES users(uid),
		tag_uid uuid REFERENCES tag(uid),
		PRIMARY KEY (user_uid, tag_uid)
		)
	`);
}

module.exports = createUserTagTable;
