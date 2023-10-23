const MatchRepository = require("../repositories/match.repository");
const Match = require("../models/match.model");

class MatchService {
	static getAll = async () => {
		try {
			return await MatchRepository.getAll();
		} catch (err) {
			throw err;
		}
	};

	static create = async (like) => {
		const match = new Match(like.user_uid, like.liked_uid);
		console.log(match);
		try {
			await MatchRepository.create(match);
			return;
		} catch (err) {
			throw err;
		}
	};

	static getByUid = async (uid) => {
		try {
			return await MatchRepository.getByUid(uid);
		} catch (err) {
			throw err;
		}
	};

	static getAllByUserUid = async (user_uid) => {
		try {
			return await MatchRepository.getAllByUserUid(user_uid);
		} catch (err) {
			throw err;
		}
	};

	static delete = async (uid) => {
		try {
			return await MatchRepository.delete(uid);
		} catch (err) {
			throw err;
		}
	};
}

module.exports = MatchService;
