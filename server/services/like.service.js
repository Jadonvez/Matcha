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
		const { userUid, likedUid } = body;
		const like = new Like(userUid, likedUid);
		try {
			return await LikeRepository.create(like);
		} catch (error) {
			throw error;
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
