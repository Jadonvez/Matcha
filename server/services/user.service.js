const UserRepository = require("../repositories/user.repository");
const LikeRepository = require("../repositories/like.repository");
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
			return UserRepository.create(user);
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

	static patch = async (id, body) => {
		try {
			return await UserRepository.patch(uid, body);
		} catch (error) {
			throw error;
		}
	};
}

module.exports = UserService;
