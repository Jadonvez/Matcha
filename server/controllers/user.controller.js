const UserService = require("../services/user.service");

/***
 * Reste à faire :
 *	- trouver une façon propre de valider les inputs
 */
class UserController {
	static getAll = async (req, res) => {
		try {
			const ret = await UserService.getAll();
			res.status(200).json(ret);
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static create = async (req, res) => {
		try {
			const ret = await UserService.create(req.body);
			if (ret == true) res.status(201).json("user created");
			else res.status(400).json("Error, user cannot be created");
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static getByUid = async (req, res) => {
		const uid = req.params.uid;
		try {
			const ret = await UserService.getByUid(uid);
			if (ret.length == 0) res.status(404).json("User not found");
			else res.status(200).json(ret);
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static delete = async (req, res) => {
		const uid = req.params.uid;
		try {
			const ret = await UserService.delete(uid);
			if (ret == false) res.status(404).json("User not found");
			else res.status(200).json("User deleted");
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static patch = async (req, res) => {
		const uid = req.params.uid;
		const body = req.body;
		try {
			const ret = await UserService.patch(uid, body);
			if (ret == false) res.status(404).json("User not found");
			else res.status(200).json("User updated");
		} catch (err) {
			res.status(400).json(err);
		}
	};
}

module.exports = UserController;
