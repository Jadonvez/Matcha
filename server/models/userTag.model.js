class UserTag {
	constructor(userUid, tagUid) {
		this.user_uid = userUid;
		this.tag_uid = tagUid;
	}

	get tableName() {
		return "user_tag";
	}
}

module.exports = UserTag;
