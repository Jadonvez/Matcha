const UserTag = require("../models/userTag.model");
const TagRepository = require("../repositories/tag.repository");
const UserTagRepository = require("../repositories/userTag.repository");

class TagService {
	static getAll = async () => {
		try {
			return await TagRepository.getAll();
		} catch (err) {
			throw err;
		}
	};

	static getByUserUid = async (userUid) => {
		try {
			return await TagRepository.getByUserUid(userUid);
		} catch (err) {
			throw err;
		}
	};

	static addManyToUser = async (tagUids, userUid) => {
		try {
			const userTags = [];
			for (const tagUid of tagUids) {
				const userTag = new UserTag(userUid, tagUid);
				userTags.push(userTag);
			}
			await UserTagRepository.deleteByUserUid(userUid);
			return await UserTagRepository.createMany(userTags);
		} catch (err) {
			throw err;
		}
	};
}

module.exports = TagService;
