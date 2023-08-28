const UserRepository = require("../repositories/user.repository");
const LikeRepository = require("../repositories/like.repository");
const MailHandler = require("../utils/mailHandler");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

class UserService {
	static getAll = async () => {
		try {
			return await UserRepository.getAll();
		} catch (err) {
			throw err;
		}
	};

	static create = async (body) => {
		const { login, mail, name, firstname, password, dob, gender, orientation } =
			body;
		const user = new User(
			login,
			mail,
			name,
			firstname,
			bcrypt.hashSync(password, 10),
			dob,
			gender,
			orientation
		);

		try {
			const ret = await UserRepository.create(user);
			await MailHandler.sendEmail(
				firstname,
				mail,
				user.mail_confirm_token
			);
			return ret;
		} catch (error) {
			throw error;
		}
	};

	static getByUid = async (uid) => {
		try {
			return await UserRepository.getByUid(uid);
		} catch (err) {
			throw err;
		}
	};

	static delete = async (uid) => {
		try {
			await LikeRepository.deleteUserRelated(uid);
			return await UserRepository.delete(uid);
		} catch (err) {
			throw err;
		}
	};

	static patch = async (uid, body) => {
		try {
			return await UserRepository.patch(uid, body);
		} catch (error) {
			throw error;
		}
	};
}

module.exports = UserService;
