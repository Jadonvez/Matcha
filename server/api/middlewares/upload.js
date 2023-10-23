const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "uploads/");
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_");
		callback(null, Date.now() + "_" + name);
	},
});

module.exports = multer({ storage: storage }).fields([
	{ name: "images[0]" },
	{ name: "images[1]" },
	{ name: "images[2]" },
	{ name: "images[3]" },
	{ name: "images[4]" },
]);
