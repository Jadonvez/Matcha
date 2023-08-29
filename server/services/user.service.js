const UserRepository = require("../repositories/user.repository");
const LikeRepository = require("../repositories/like.repository");
const MailHandler = require("../utils/mailHandler");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
			await MailHandler.sendEmail(user);
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

	static confirmEmail = async (uid, token) => {
		try {
			const user = await UserRepository.getByUid(uid);
			if (!user) return false;
			if (user.mail_confirm_token == token) {
				return await UserRepository.patch(uid, { mail_confirm: true });
			} else {
				return false;
			}
		} catch (err) {
			throw err;
		}
	};

	static login = async (body) => {
		try {
			const user = await UserRepository.getByMail(body.mail);
			console.log(user);
			if (!bcrypt.compareSync(body.password, user.password)) {
				return undefined;
			}
			console.log("c'est bon");
			const accessToken = this.#createToken(user.uid);
			console.log(accessToken);
			return accessToken;
		} catch (err) {
			throw err;
		}
	};

	static #createToken = (uid) => {
		console.log(process.env.TOKEN_SECRET);
		return jwt.sign({ uid }, process.env.TOKEN_SECRET, {
			expiresIn: "120s",
		});
	};
}

module.exports = UserService;
