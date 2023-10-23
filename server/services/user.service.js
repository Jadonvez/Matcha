const UserRepository = require("../repositories/user.repository");
const PictureService = require("./picture.service");
const LikeService = require("./like.service");
const MailHandler = require("../utils/mailHandler");
const User = require("../models/user.model");
const UserDto = require("../dto/user.dto");
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
			const user = await UserRepository.getByUid(uid);
			const dto = new UserDto(user);
			return dto;
		} catch (err) {
			throw err;
		}
	};

	static delete = async (uid) => {
		try {
			await LikeService.deleteAllByUser(uid);
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
				await UserRepository.patch(uid, { mail_confirm: true });
				const accessToken = jwt.sign(
					{
						UserInfo: {
							mail: user.mail,
							uid: user.uid,
						},
					},
					process.env.TOKEN_SECRET,
					{ expiresIn: "6000s" }
				);
				return accessToken;
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
			if (!bcrypt.compareSync(body.password, user.password)) {
				return { succes: false, message: "credentials" };
			} else if (user.mail_confirm === false) {
				return { succes: false, message: "mail_confirm" };
			}

			const accessToken = jwt.sign(
				{
					UserInfo: {
						mail: user.mail,
						uid: user.uid,
					},
				},
				process.env.TOKEN_SECRET,
				{ expiresIn: "6000s" }
			);
			/*const refreshToken = jwt.sign(
				{ login: user.login },
				process.env.TOKEN_SECRET,
				{ expiresIn: "1d" }
			);
			await UserRepository.patch(user.uid, { refresh_token: refreshToken });*/
			return {
				success: true,
				accessToken: accessToken /*, refreshToken: refreshToken*/,
			};
		} catch (err) {
			throw err;
		}
	};

	static updateProfile = async (files, body, uid) => {
		try {
			await UserRepository.patch(uid, {
				bio: body.biography,
				location: body.location,
			});
			await PictureService.updateByUser(files, uid, body.deleted);
		} catch (err) {
			throw err;
		}
	};
}

module.exports = UserService;
