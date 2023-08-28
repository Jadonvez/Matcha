const MatchService = require("./match.service");
const LikeRepository = require("../repositories/like.repository");
const Like = require("../models/like.model");

class LikeService {
	static getAll = async () => {
		try {
			return await LikeRepository.getAll();
		} catch (err) {
			throw err;
		}
	};

	static create = async (body) => {
		const { user_uid, liked_uid } = body;
		const like = new Like(user_uid, liked_uid);
		try {
			const ret = await LikeRepository.create(like);
			if (ret) {
				const match = await LikeRepository.checkMatch(like);
				if (match.length > 0) {
					await MatchService.create(like);
				}
			}
			return ret;
		} catch (err) {
			throw err;
		}
	};

	static getByUid = async (uid) => {
		try {
			return await LikeRepository.getByUid(uid);
		} catch (err) {
			throw err;
		}
	};

	static delete = async (uid) => {
		try {
			return await LikeRepository.delete(uid);
		} catch (err) {
			throw err;
		}
	};
}

module.exports = LikeService;
