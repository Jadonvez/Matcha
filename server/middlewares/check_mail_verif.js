const pool = require("../db");

module.exports = (req, res, next) => {
	try {
		console.log("----> middleware check_mail_verif");
		pool.query(
			"SELECT * FROM users WHERE mail = $1",
			[req.body.mail],
			(error, results) => {
				if (error) res.status(401).send({ error: error });
				else if (!results.rows.length)
					res.status(401).send("Le mail n'existe pas.");
				else if (results.rows.length)
					if (results.rows[0].mail_confirm == "false")
						res
							.status(401)
							.send(
								"Veuillez activer votre compte en cliquant sur le lien de verification dans vos e-mail."
							);
					else next();
			}
		);
	} catch (error) {
		res.status(401).json({ error: "middleware mail_verif" });
	}
};
