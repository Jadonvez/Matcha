const PictureRepository = require("../repositories/picture.repository");
const Picture = require("../models/picture.model");
const fs = require("fs");
const PictureDto = require("../dto/picture.dto");

class PictureService {
	static getByUser = async (userUid) => {
		try {
			const pictures = await PictureRepository.getByUser(userUid);
			const dtos = [];
			pictures.forEach((picture) => {
				const dto = new PictureDto(picture);
				dtos.push(dto);
			});
			return dtos;
		} catch (err) {
			throw err;
		}
	};

	static updateByUser = async (files, userUid, deleted) => {
		try {
			const images = [];
			for (const key in files) {
				const file = files[key][0];
				const index = parseInt(key[7]);
				const fileBuffer = fs.readFileSync(file.path);
				const base64Data = fileBuffer.toString("base64");
				const image = new Picture(
					userUid,
					index,
					file.filename,
					file.path,
					file.mimetype,
					file.size,
					base64Data
				);
				images.push(image);
				fs.unlinkSync(file.path);
			}

			const indexes = deleted.split(",");

			if (indexes.length > 0 && indexes[0] != "") {
				await PictureRepository.deleteByIndexes(userUid, indexes);
			}
			if (images.length > 0) {
				await PictureRepository.createMany(images);
			}
		} catch (err) {
			throw err;
		}
	};
}

module.exports = PictureService;
