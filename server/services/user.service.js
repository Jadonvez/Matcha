const UserRepository = require("../repositories/user.repository");
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

	static getById = async (id) => {
		try {
			return await UserRepository.getById(id);
		} catch (err) {
			throw err;
		}
	};

	static getByUid = async (uid) => {
		try {
			return await UserRepository.getByUid(uid);
		} catch (err) {
			throw err;
		}
	};

	static addUser = async (body) => {
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

	static delete = async (id) => {
		try {
			return await UserRepository.delete(id);
		} catch (err) {
			throw err;
		}
	};

	static update = async (body, id) => {
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
		user.id = id;
		try {
			return UserRepository.update(user);
		} catch (error) {
			throw error;
		}
	};
}

module.exports = UserService;
