const pool = require("../db");
const queries = require("../queries");
const UserService = require("../services/user.service");
const User = require("../models/user.model");

/***
 *
 *
 *
 * Reste à faire : trouver une façon propre de valider les inputs
 */
class UserController {
	static getUsers = async (req, res) => {
		try {
			const ret = await UserService.getAll();
			res.status(200).json(ret);
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static addUser = async (req, res) => {
		try {
			const ret = await UserService.addUser(req.body);
			if (ret == true) res.status(201).json("user created");
			else res.status(400).json("Error, user cannot be created");
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static getUserById = async (req, res) => {
		const id = parseInt(req.params.id);
		try {
			const ret = await UserService.getById(id);
			if (ret.length == 0) res.status(404).json("User not found");
			else res.status(200).json(ret);
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static getUserByUid = async (req, res) => {
		const uid = req.params.uid;
		try {
			const ret = await UserService.getByUid(uid);
			if (ret.length == 0) res.status(404).json("User not found");
			else res.status(200).json(ret);
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static delete = async (req, res) => {
		const id = parseInt(req.params.id);
		try {
			const ret = await UserService.delete(id);
			if (ret == false) res.status(404).json("User not found");
			else res.status(200).json("User deleted");
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static update = async (req, res) => {
		const id = parseInt(req.params.id);
		try {
			const ret = await UserService.update(req.body, id);
			if (ret == true) res.status(201).json("user updated");
			else res.status(400).json("Error, user cannot be updated");
		} catch (err) {
			res.status(400).json(err);
		}
	};

	static updateName = (req, res) => {
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

	static updateFirstname = (req, res) => {
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

	static updateMail = (req, res) => {
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

	static updateGender = (req, res) => {
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

	static updateOrientation = (req, res) => {
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

	static updateUser = (req, res) => {
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
}
module.exports = UserController;
