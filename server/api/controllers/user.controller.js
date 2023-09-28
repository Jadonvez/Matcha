const UserService = require("../../services/user.service");

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
			if (err.constraint == "users_mail_key")
				res.status(400).json("Mail already exists");
			else if (err.constraint == "users_login_key")
				res.status(400).json("Login already exists");
			else res.status(400).json(err);
		}
	};

	static getByUid = async (req, res) => {
		const uid = req.params.uid;
		try {
			const ret = await UserService.getByUid(uid);
			if (!ret) res.status(404).json("User not found");
			else res.status(200).json(ret);
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static getCurrent = async (req, res) => {
		const uid = req.user.UserInfo.uid;
		try {
			const ret = await UserService.getByUid(uid);
			console.log("ret:", ret);
			if (!ret) res.status(404).json("User not found");
			else res.status(200).json(ret);
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static delete = async (req, res) => {
		const uid = req.user.UserInfo.uid;
		try {
			const ret = await UserService.delete(uid);
			if (ret == false) res.status(404).json("User not found");
			else res.status(200).json("User deleted");
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static patch = async (req, res) => {
		try {
			const uid = req.user.UserInfo.uid;
			const body = req.body;
			const ret = await UserService.patch(uid, body);
			if (ret == false) res.status(404).json("User not found");
			else res.status(200).json("User updated");
		} catch (err) {
			if (err.constraint == "users_mail_key")
				res.status(403).json("Mail already exists");
			else if (err.constraint == "users_login_key")
				res.status(403).json("Login already exists");
			else res.status(400).json(err);
		}
	};

	static confirmEmail = async (req, res) => {
		const uid = req.params.uid;
		const token = req.params.token;
		try {
			const ret = await UserService.confirmEmail(uid, token);
			if (ret == false) res.status(400).json("Error, mail cannot be confirmed");
			else {
				res.cookie("access_token", ret);
				res.status(200).json("Mail confirmed");
			}
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static login = async (req, res) => {
		const body = req.body;
		try {
			const ret = await UserService.login(body);
			if (ret.succes == false) {
				if (ret.message === "credentials") {
					res.status(400).json("Wrong mail or password");
				} else if (ret.message === "mail_confirm") {
					res.status(400).json("Mail not confirmed");
				}
			} else {
				res.cookie("access_token", ret.accessToken, {
					//httpOnly: true,
					//secure: true,
					//sameSite: "None",
					//maxAge: 24 * 60 * 60 * 1000,
				});
				res.status(200).json("Authenticated");
			}
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static profile = async (req, res) => {
		const files = req.files;
		const body = req.body;
		const uid = req.user.UserInfo.uid;
		try {
			await UserService.updateProfile(files, body, uid);
			res.status(200).json("Profile updated");
		} catch (err) {
			res.status(400).json(err);
		}
	};
}

module.exports = UserController;
