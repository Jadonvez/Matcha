const TagService = require("../../services/tag.service");

class TagController {
	static getAll = async (req, res) => {
		try {
			const ret = await TagService.getAll();
			res.status(200).json(ret);
		} catch (err) {
			res.status(400).json(err);
		}
	};
}

module.exports = TagController;
