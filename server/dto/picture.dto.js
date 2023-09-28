class PictureDto {
	constructor(picture) {
		this.index = picture.index;
		this.mimetype = picture.mimetype;
		this.base64data = picture.base64data;
	}
}

module.exports = PictureDto;