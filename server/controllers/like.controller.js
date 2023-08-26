const LikeService = require("../services/like.service");

class LikeController {
	static getAll = async (req, res) => {
		try {
			const ret = await LikeService.getAll();
			res.status(200).json(ret);
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static getByUid = async (req, res) => {
		const uid = req.params.uid;
		try {
			const ret = await LikeService.getByUid(uid);
			if (ret.length == 0) res.status(404).json("Like not found");
			else res.status(200).json(ret);
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static create = async (req, res) => {
		try {
			const ret = await LikeService.create(req.body);
			if (ret == true) res.status(201).json("Like created");
			else res.status(400).json("Error, Like cannot be created");
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static delete = async (req, res) => {
		const uid = req.params.uid;
		try {
			const ret = await LikeService.delete(uid);
			if (ret == false) res.status(404).json("Like not found");
			else res.status(200).json("Like deleted");
		} catch (err) {
			res.status(400).json(err);
		}
	};
}

module.exports = LikeController;
