const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config;

class MailHandler {
	static #createTransporter = async () => {
		const oauth2Client = new OAuth2(
			process.env.GMAIL_CLIENT_ID,
			process.env.GMAIL_CLIENT_SECRET,
			"https://developers.google.com/oauthplayground"
		);

		oauth2Client.setCredentials({
			refresh_token: process.env.GMAIL_REFRESH_TOKEN,
		});

		const accessToken = await new Promise((resolve, reject) => {
			oauth2Client.getAccessToken((err, token) => {
				if (err) {
					console.log(err);
					reject("Failed to create gmail access token");
				}
				resolve(token);
			});
		});

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: process.env.GMAIL_ADDRESS,
				accessToken,
				clientId: process.env.GMAIL_CLIENT_ID,
				clientSecret: process.env.GMAIL_CLIENT_SECRET,
				refreshToken: process.env.GMAIL_REFRESH_TOKEN,
			},
		});
		return transporter;
	};

	static sendEmail = async (firstname, mail, confirmMailToken) => {
		let emailTransporter = await this.#createTransporter();
		await emailTransporter.sendMail({
			subject: "Matcha: confirmation de votre email",
			//text: "I am sending an email from mailHandler !",
			html: `Bonjour ${firstname}, <br/>
			Bienvenue dans la communautee de Matcha ! <br/>
			Veuillez verifier votre email pour continuer
				<a href="http://${process.env.DOMAIN}:${process.env.PORT_EXPRESS}/confirm_email?token=${confirmMailToken}">Cliquer ici</a>`,
			to: mail,
			from: process.env.GMAIL_ADDRESS,
		});
	};
}

module.exports = MailHandler;
