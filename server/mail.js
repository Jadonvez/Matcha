const nodemailer = require("nodemailer");
const pool = require("./models/db_init");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const sendEmail = async (uid, mail) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		auth: {
			user: "matcha.jadonvez@gmail.com",
			//pass: "root42..",
			pass: "jlal ffru lvox wmbf",
		},
	});

	token = uuidv4();
	pool.query(
		"INSERT INTO token (token, uid_user) VALUES ($1, $2)",
		[token, uid],
		(error, results) => {
			if (error) {
				throw error;
			}
		}
	);

	let info = transporter.sendMail(
		{
			from: `"Matcha" <matcha.jadonvez@gmail.com>`,
			to: mail,
			subject: "Matcha: confirmation de votre email",
			text: "Confirmation de votre email",
			html: `Bienvenue dans la communautee de Matcha !
                Veuillez verifier votre email pour continuer
                    <a href="http://localhost:5000/confirm_email?token=${token}">Cliquer ici</a>`,
		},
		(error, info) => {
			if (error) {
				throw error;
			}
		}
	);
};

const confirmEmail = (req, res) => {
	const token = req.query.token;
	pool.query(
		"SELECT uid_user FROM token WHERE token = $1",
		[token],
		(error, results) => {
			if (error) {
				throw error;
			} else {
				const uid = results.rows[0].uid_user;
				pool.query(
					"UPDATE users SET mail_confirm = $2 WHERE uid = $1",
					[uid, true],
					(error, results) => {
						if (error) {
							throw error;
						} else {
							pool.query(
								"DELETE FROM token WHERE token = $1",
								[token],
								(error, results) => {}
							);
							res.status(200);
							res.redirect("http://localhost:3001/confirm_email");
						}
					}
				);
			}
		}
	);
};

module.exports = {
	sendEmail,
	confirmEmail,
};
