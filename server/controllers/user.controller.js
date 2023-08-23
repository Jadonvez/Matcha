const pool = require("../db/db_init");
const queries = require("../queries");
const bcrypt = require("bcrypt");

const getUsers = (req, res) => {
	console.log("on chope les users");
	pool.query(queries.getUsers, (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

const getUsersById = (req, res) => {
	console.log("on chope un user par son Id");
	const id = parseInt(req.params.id);
	pool.query(queries.getUsersById, [id], (error, results) => {
		if (error) {
			throw error;
		}
		if (results.rows.length === 0)
			res.status(404).json({ error: "utilisateur introuvable" });
		else res.status(200).json(results.rows);
	});
};

const getUsersByUid = (req, res) => {
	console.log("on chope un user par son Uid");
	const segments = req.url.split("/");
	const uid = segments[segments.length - 1];
	pool.query(queries.getUsersByUid, [uid], (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

const addUser = (req, res) => {
	const { name, firstname, mail, password, dob, gender } = req.body;

	// check le mail si il exist
	pool.query(queries.checkMailExists, [mail], (error, results) => {
		if (results.rows.length) {
			res.send("Le mail existe deja.");
		} else {
			// ajout du user dans la db

			pool.query(
				queries.addUser,
				[name, firstname, mail, bcrypt.hashSync(password, 10), dob, gender],
				(error, results) => {
					if (error) throw error;
					res.status(201).send("Ajout du user reussie.");
				}
			);
		}
	});
};

const removeUser = (req, res) => {
	console.log("on supprime le user par le id");
	const id = parseInt(req.params.id);
	pool.query(queries.getUsersById, [id], (error, results) => {
		const noUserFound = !results.rows.length;
		if (noUserFound) {
			res.send("User n'existe pas dans la db");
		} else {
			pool.query(queries.removeUser, [id], (error, results) => {
				if (error) throw error;
				res.status(200).send("Suppression du user reussies");
			});
		}
	});
};

const updateName = (req, res) => {
	const id = parseInt(req.params.id);
	const { name } = req.body;

	pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
		const noUserFound = !results.rows.length;
		if (noUserFound) {
			console.log("User n'existe pas dans la db");
			res.send("User n'existe pas dans la db");
		} else {
			pool.query(
				"UPDATE users SET name = $1 WHERE id = $2",
				[name, id],
				(error, results) => {
					if (error) throw error;
					console.log("User name update reussie.");
					res.status(200).send("User name update reussie.");
				}
			);
		}
	});
};

const updateFirstname = (req, res) => {
	const id = parseInt(req.params.id);
	const { firstname } = req.body;

	pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
		const noUserFound = !results.rows.length;
		if (noUserFound) {
			console.log("User n'existe pas dans la db");
			res.send("User n'existe pas dans la db");
		} else {
			pool.query(
				"UPDATE users SET firstname = $1 WHERE id = $2",
				[firstname, id],
				(error, results) => {
					if (error) throw error;
					console.log("User firstname update reussie.");
					res.status(200).send("User firstname update reussie.");
				}
			);
		}
	});
};

const updateMail = (req, res) => {
	const id = parseInt(req.params.id);
	const { mail } = req.body;

	pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
		const noUserFound = !results.rows.length;
		if (noUserFound) {
			console.log("User n'existe pas dans la db");
			res.send("User n'existe pas dans la db");
		} else {
			pool.query(
				"UPDATE users SET mail = $1 WHERE id = $2",
				[mail, id],
				(error, results) => {
					if (error) throw error;
					console.log("User mail update reussie.");
					res.status(200).send("User mail update reussie.");
				}
			);
		}
	});
};

const updateGender = (req, res) => {
	const id = parseInt(req.params.id);
	const { gender } = req.body;

	pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
		const noUserFound = !results.rows.length;
		if (noUserFound) {
			console.log("User n'existe pas dans la db");
			res.send("User n'existe pas dans la db");
		} else {
			pool.query(
				"UPDATE users SET gender = $1 WHERE id = $2",
				[gender, id],
				(error, results) => {
					if (error) throw error;
					console.log("User gender update reussie.");
					res.status(200).send("User gender update reussie.");
				}
			);
		}
	});
};

const updateOrientation = (req, res) => {
	const id = parseInt(req.params.id);
	const { orientation } = req.body;

	pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
		const noUserFound = !results.rows.length;
		if (noUserFound) {
			console.log("User n'existe pas dans la db");
			res.send("User n'existe pas dans la db");
		} else {
			pool.query(
				"UPDATE users SET orientation = $1 WHERE id = $2",
				[orientation, id],
				(error, results) => {
					if (error) throw error;
					console.log("User orientation update reussie.");
					res.status(200).send("User orientation update reussie.");
				}
			);
		}
	});
};

const updateUser = (req, res) => {
	const id = parseInt(req.params.id);
	const { bio } = req.body;

	pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
		const noUserFound = !results.rows.length;
		if (noUserFound) {
			res.send("User n'existe pas dans la db");
		} else {
			pool.query(queries.updateUser, [bio, id], (error, results) => {
				if (error) throw error;
				console.log("User bio update reussie.");
				res.status(200).send("User bio update reussie.");
			});
		}
	});
};

// function validateUpdate(user) {
//     const validMail = typeof user.mail == "string" && user.mail.trim() != "" && user.mail.trim().match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
//     //const validPassword = typeof user.password == "string" && user.password.trim() != "" && user.password.trim().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!-_%*?&+.;:])[A-Za-z\d@$!-_%*?&+.;:]{8,25}/);
//     return {
//         mail: validMail,
//         //password: validPassword,
//     };
// }

// const updateProfil = (req, res) => {
//     //const { mail, name, firstname, password, gender, orientation, uid } = req.body;
//     const { mail, name, firstname, gender, orientation, bio, uid } = req.body;
//     var err = validateUpdate(req.body);
//     console.log(req.body.uid);
//     //if (err.mail && err.password) {
//     if (err.mail) {
//         pool.query("UPDATE users SET mail=$1, name=$2, firstname=$3, gender=$4, orientation=$5, bio=$6 WHERE uid=$7", [mail, name, firstname, gender, orientation, bio, uid],
//         //pool.query("UPDATE users SET mail=$1, name=$2, firstname=$3, password=$4, gender=$5, orientation=$6 WHERE uid=$7", [mail, name, firstname, bcrypt.hashSync(password, 10), gender, orientation, uid],
//         async (error, results) => {
//             if (error)
//                 res.status(401).json({ error: error });
//             else {
//                 res.status(200).json({ message: "New Update: " + mail });
//             }
//         });
//     }
//     else {
//         if (!err.mail) res.status(401).json({ error: "mail" });
//         //else if (!err.password) res.status(401).json({ error: "password invalide" });
//     }
// };

module.exports = {
	getUsers,
	getUsersById,
	addUser,
	removeUser,
	updateUser,
	getUsersByUid,
	updateName,
	updateFirstname,
	updateMail,
	updateGender,
	updateOrientation,
	//followUser,
};
