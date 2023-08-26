const pool = require("../db");
const queries = require("../utils/queryBuilder");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
var moment = require("moment");
//const SendmailTransport = require('nodemailer/lib/sendmail-transport');
const sendEmail = require("../utils/mail");

const createToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, {
		expiresIn: "14400s",
	});
};

// const destroyToken = (id) => {
//     return jwt.sign({id}, process.env.TOKEN_SECRET, {
//         expiresIn: '1'
//     });
// }

// const signIn = async (req, res) => {
//     const { mail, password } = req.body;
//     console.log(req.body.password);
//     try {
//         const results = await pool.query(queries.checkMailPasswordExists, [mail, password]);
//         //compare = await bcrypt.compare(req.body.password, results.rows[0].password);
//         console.log(results.rows[0]);
//         const noUserFound = !results.rows.length;
//         if (noUserFound) {
//             res.status(401).send("User n'existe pas dans la db");
//         }
//         else{
//             //res.send("les token bg now.");
//             const accessToken = createToken(results);
//             res.send({
//                 accessToken,
//             });
//         }
//         } catch(error) {
//             console.error(error);
//         }
// }

const signIn = async (req, res) => {
	const { mail, password } = req.body;
	try {
		//const results = await pool.query("SELECT * FROM users WHERE mail = $1 AND password = $2", [mail, password]);
		const results = await pool.query("SELECT * FROM users WHERE mail = $1", [
			mail,
		]);
		//if (results.rows[0])
		//console.log(results.rows[0].password);
		const noUserFound = !results.rows.length;
		if (noUserFound) {
			res.status(401).send("Le mail n'existe pas.");
		} else if (req.body.password && results.rows[0].password)
			if (!bcrypt.compareSync(req.body.password, results.rows[0].password)) {
				res.status(401).send("Mot de passe incorrect.");
				//throw Error("mot de passe invalide");
			} else {
				const accessToken = createToken(results.rows[0].uid);
				// console.log(results.rows[0].id)
				// console.log(results.rows[0].login)
				// console.log('accesToken ====> signIn de auth.controller');
				// console.log(accessToken);
				// console.log(mail);
				res
					.cookie("access-token", accessToken, {
						expires: new Date(Date.now() + 86400 * 10000),
						httpOnly: true,
						secure: false,
						//sameSite: "Lax",
						//signed: true,
					})
					.status(200);
				//res.header("Access-Control-Allow-Origin", "*");
				//res.redirect("http://127.0.0.1:3001");
				res.send(req.cookies);
				//  res.send({
				//      accessToken,
				//  });
			}
	} catch (error) {
		console.error(error);
	}
};

function validateRegistration(user) {
	const validLogin =
		typeof user.login == "string" &&
		user.login.trim() != "" &&
		user.login.trim().match(/^(?=[a-zA-Z0-9]{5,12}$)/);
	const validMail =
		typeof user.mail == "string" &&
		user.mail.trim() != "" &&
		user.mail
			.trim()
			.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
	const validDob = typeof user.dob == "date";
	const validPassword =
		typeof user.password == "string" &&
		user.password.trim() != "" &&
		user.password
			.trim()
			.match(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!-_%*?&+.;:])[A-Za-z\d@$!-_%*?&+.;:]{8,25}/
			);
	return {
		login: validLogin,
		mail: validMail,
		password: validPassword,
		dob: validDob,
	};
}

// function check_pass_mail(clogin, mail) {
//     results = pool.query("SELECT * FROM users WHERE mail = $1", [mail], (error, results) => {
//         console.log(results.rows[0].login);
//         console.log(results.rows[0].mail);
//         if (results.rows[0].mail)
//             if (results.rows[0].mail == mail)
//             {
//                 return 1;
//             }
//         else if (results.rows[0].login)
//             if (results.rows[0].login == clogin)
//             {
//                 return 2;
//             }
//         else return true;
//     })
// }

const register = (req, res) => {
	const { login, mail, name, firstname, password, dob, gender, orientation } =
		req.body;
	var err = validateRegistration(req.body);
	const uid = uuidv4();
	if (err.mail && err.password && err.login) {
		pool.query(
			"INSERT INTO users (uid, login, mail, name, firstname, password, dob, gender, orientation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
			[
				uid,
				login,
				mail,
				name,
				firstname,
				bcrypt.hashSync(password, 10),
				moment(dob, "YYYY MM DD").add(10, "hours"),
				gender,
				orientation,
			],
			async (error, results) => {
				if (error) res.status(401).json({ error: error });
				else {
					//console.log(moment(dob, "YYYY/MM/DD"));
					await sendEmail.sendEmail(uid, mail);
					res.status(200).json({ message: "New User: " + mail });
				}
			}
		);
	} else {
		if (!err.login || err.login === null)
			res.status(401).json({ error: "login" });
		else if (!err.mail) res.status(401).json({ error: "mail" });
		else if (!err.password)
			res.status(401).json({ error: "password invalide" });
		else if (!err.dob) res.status(401).json({ error: "dob" });
	}
}; //)};

const logOut = (req, res) => {
	//const stopToken = destroyToken();
	//    res.send({
	//        stopToken,
	//    });

	res.cookie("access-token", "", { maxAge: 1 });
	res.redirect("/");
};

module.exports = {
	signIn,
	logOut,
	register,
};
