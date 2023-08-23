const pool = require("../db/db_init");
var moment = require("moment");
const queries = require("../queries");

const like = (req, res) => {
	const liker = req.body.likerUid;
	const liked = req.body.likedUid;

	pool.query(
		"SELECT * FROM likes WHERE liker_uid = $1 AND liked_uid = $2",
		[liker, liked],
		(error, results) => {
			if (error) {
				throw error;
			} else if (results.rows.length) {
				pool.query(
					"DELETE FROM likes WHERE liker_uid = $1 AND liked_uid = $2",
					[liker, liked],
					(error, results) => {
						if (error) {
							throw error;
						}
						res.json({ info: "unlike" }).status(200);
					}
				);
			} else {
				pool.query(
					"INSERT INTO likes (liker_uid, liked_uid, created_at) VALUES ($1, $2, $3)",
					[liker, liked, moment().format("LLL")],
					(error, results) => {
						if (error) {
							throw error;
						}
						res.json({ info: "like" }).status(200);
					}
				);
			}
		}
	);
};

const getLiker = (req, res) => {
	const segments = req.url.split("/");
	const uid = segments[segments.length - 1];

	pool.query(
		"SELECT liker_uid FROM likes WHERE liked_uid = $1",
		[uid],
		(error, results) => {
			if (error) {
				throw error;
			} else if (results.rows.length === 0)
				res.status(200).json("Aucune personne n'a like le profil");
			else res.status(200).json(results.rows);
		}
	);
};

const getLiked = (req, res) => {
	const segments = req.url.split("/");
	const uid = segments[segments.length - 1];

	pool.query(
		"SELECT liked_uid FROM likes WHERE liker_uid = $1",
		[uid],
		(error, results) => {
			if (error) {
				throw error;
			} else if (results.rows.length === 0)
				res.status(200).json("Ce profil n'a like aucune personne");
			else res.status(200).json(results.rows);
		}
	);
};

const getMatchs = (req, res) => {
	const segments = req.url.split("/");
	const uid = segments[segments.length - 1];

	pool.query(
		"SELECT * FROM match WHERE uid_1 = $1 OR uid_2 = $1",
		[uid],
		(error, results) => {
			if (error) {
				throw error;
			} else if (results.rows.length === 0)
				res.status(200).json("Ce profil n'a aucun match");
			else res.status(200).json(results.rows);
		}
	);
};

const createMatch = (req, res) => {
	const liker = req.body.likerUid;
	const liked = req.body.likedUid;

	pool.query(
		"SELECT * FROM likes WHERE liker_uid = $1 AND liked_uid = $2",
		[liker, liked],
		(error, results) => {
			if (error) {
				res.json({ error: "Bad Request" }).status(400);
			} else if (results.rows.length) {
				pool.query(
					"INSERT INTO match (uid_1, uid_2, date) VALUES ($1, $2, $3)",
					[liker, liked, moment().format("LLL")],
					(error, results) => {
						if (error) {
							throw error;
						}
						res.json({ info: "match created" }).status(200);
					}
				);
			} else {
				res.json({ info: "no match" }).status(200);
			}
		}
	);
};

const deleteMatch = (req, res) => {
	const liker = req.body.likerUid;
	const liked = req.body.likedUid;

	pool.query(
		"SELECT * FROM match WHERE uid_1 = $1 AND uid_2 = $2 OR uid_1 = $2 AND uid_2 = $1",
		[liker, liked],
		(error, results) => {
			if (error) {
				res.json({ error: "Bad Request" }).status(400);
			} else if (results.rows.length) {
				pool.query(
					"DELETE FROM match WHERE uid_1 = $1 AND uid_2 = $2 OR uid_1 = $2 AND uid_2 = $1",
					[liker, liked],
					(error, results) => {
						if (error) {
							throw error;
						}
						res.json({ info: "match deleted" }).status(200);
					}
				);
			} else {
				res.json({ info: "no match" }).status(200);
			}
		}
	);
};

const checkMatch = (req, res) => {
	const liker = req.params.uid1;
	const liked = req.params.uid2;

	pool.query(
		"SELECT * FROM match WHERE uid_1 = $1 AND uid_2 = $2 OR uid_1 = $2 AND uid_2 = $1",
		[liker, liked],
		(error, results) => {
			if (error) {
				console.log("error dans le checkmatch");
				throw error;
			} else if (results.rows.length === 0) {
				console.log("pas de match entre les deux users dans le checkmatch");
				res.status(200).json("Pas de match entre les deux users");
			} else {
				console.log("il y a le match dans le checkmatch");
				res.status(200).json(results.rows);
			}
		}
	);
};

module.exports = {
	like,
	getLiker,
	getLiked,
	createMatch,
	getMatchs,
	deleteMatch,
	checkMatch,
};
