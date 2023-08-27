const MatchService = require("../services/match.service");

class MatchController {
	static getAll = async (req, res) => {
		try {
			const ret = await MatchService.getAll();
			res.status(200).json(ret);
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static getByUid = async (req, res) => {
		const uid = req.params.uid;
		try {
			const ret = await MatchService.getByUid(uid);
			if (!ret) res.status(404).json("Match not found");
			else res.status(200).json(ret);
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static getAllByUserUid = async (req, res) => {
		const uid = req.params.uid;
		try {
			console.log(uid);
			const ret = await MatchService.getAllByUserUid(uid);
			if (!ret) res.status(404).json("User not found");
			else res.status(200).json(ret);
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static delete = async (req, res) => {
		const uid = req.params.uid;
		try {
			const ret = await MatchService.delete(uid);
			if (ret == false) res.status(404).json("Match not found");
			else res.status(200).json("Match deleted");
		} catch (err) {
			res.status(400).json(err);
		}
	};
}

module.exports = MatchController;
