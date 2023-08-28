const UserRepository = require("../repositories/user.repository");
const LikeRepository = require("../repositories/like.repository");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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
			this.sendMail();
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

	static sendMail = () => {
		var transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "mail.matcha.42.lyon@gmail.com",
				pass: "NotEZToFind69",
			},
		});

		var mailOptions = {
			from: "mail.matcha.42.lyon@gmail.com",
			to: "eickmayk@hotmail.fr",
			subject: "Sending Email using Node.js",
			text: "That was easy!",
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent: " + info.response);
			}
		});
	};
}

module.exports = UserService;
