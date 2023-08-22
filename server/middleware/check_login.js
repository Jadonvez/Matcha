const pool = require("../models/db_init");

module.exports = (req, res, next) => {
	try {
		console.log("----> middleware check_login");
		//console.log(req.body.mail);
		//console.log(req.body.login);
		pool.query(
			"SELECT * FROM users WHERE login = $1",
			[req.body.login],
			(error, results) => {
				if (error) res.status(401).json({ error: error });
				else if (results.rows.length) res.send("Le login existe deja.");
				else next();
			}
		);
	} catch (error) {
		res.status(401).json({ error: "middleware login" });
	}
};
