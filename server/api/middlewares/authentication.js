const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const auth = req.headers["authorization"];

	if (!auth)
		return res.status(403).send("A token is required for authentication");
	try {
		const splitted = auth.split(" ");
		if (splitted[0] !== "Bearer") {
			return res.status(403).send("Invalid token");
		}
		const token = splitted[1];
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = decoded;
	} catch (err) {
		return res.status(403).send("Invalid token");
	}
	return next();
};

module.exports = verifyToken;
