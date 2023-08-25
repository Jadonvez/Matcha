// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, `${__dirname}/../client/public/uploads/profil/profilpic`);
//   },
//   filename: function(req, file, cb) {
//     const ext = path.extname(file.originalname);
//     console.log("test 2")
//     console.log(req.body.name)
//     const fileName = req.body.name + ext;
//     cb(null, fileName);
//   }
// });

// const fileFilter = function(req, file, cb) {
//   const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
//   if (allowedMimeTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type"));
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5000000 // 500 KB
//   },
//   fileFilter: fileFilter
// });

// const    uploadProfil = async (req, res, next) => {
//   try {
//     //await upload.single('file')(req, res, (err) => {
//     await new Promise((resolve, reject) => {
//         upload.single('file')(req, res, (err) => {
//         if (err) {
//             reject(err);
//             //throw err;
//         } else {
//             resolve();
//         }
//         next();
//         });
//     });
//     if (!req.file) {
//       throw new Error("Invalid file");
//     }
//     res.status(200).send("Image téléchargée avec succès");
//     console.log(req.body.name)
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = { uploadProfil }

const multer = require("multer");
//const path = require("path");
const fs = require("fs");
const pool = require("../db");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, `${__dirname}/../client/public/uploads/profil/profilpic`);
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const fileFilter = function (req, file, cb) {
	const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
	if (allowedMimeTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Invalid file type"));
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5000000, // 500 KB
	},
	fileFilter: fileFilter,
});

const uploadProfil = async (req, res, next) => {
	try {
		await new Promise((resolve, reject) => {
			upload.single("file")(req, res, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});

		if (!req.file) {
			throw new Error("Invalid file");
		}

		//const ext = path.extname(req.file.originalname);
		const fileName = req.body.name + ".jpg";
		const oldPath = req.file.path;
		const newPath = `${__dirname}/../client/public/uploads/profil/profilpic/${fileName}`;
		const PpicturePath = `../uploads/profil/profilpic/${fileName}`;

		fs.rename(oldPath, newPath, (err) => {
			if (err) {
				throw err;
			}
			console.log("File renamed successfully");
		});
		// try de mettre le path de l'image dans la db
		try {
			console.log(req.body.uid);
			pool.query(
				"SELECT * FROM users WHERE uid = $1",
				[req.body.uid],
				(error, results) => {
					if (error) res.status(401).send("error dans ma requete sql");
					else if (!results.rows.length)
						res.status(401).send("User est inconnu dans la db");
					else if (results.rows.length)
						if (results.rows[0].ppicture)
							pool.query(
								"UPDATE users SET ppicture = $1 WHERE uid = $2",
								[PpicturePath, req.body.uid],
								(error, results) => {
									if (error) throw error;
									res.status(200).send("Ajout du path dans la db réussi");
								}
							);
						else {
							res.status(200).send("Image téléchargée avec succès");
						}
				}
			);
		} catch (error) {
			console.log("le catch a fait mouche");
		}
		// fin test ajout db
		//res.status(200).send("Image téléchargée avec succès");
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: error.message });
	}
};

module.exports = { uploadProfil };
