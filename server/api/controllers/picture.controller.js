const PictureService = require("../../services/picture.service");

class PictureController {
	static getByUser = async (req, res) => {
		const userUid = req.params.uid;
		try {
			const ret = await PictureService.getByUser(userUid);
			res.status(200).json(ret);
		} catch (err) {
			res.status(400).json(err);
		}
	};
}

module.exports = PictureController;
