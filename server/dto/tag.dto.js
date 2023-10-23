class TagDto {
	constructor(tag) {
		this.uid = tag.uid;
		this.name = tag.name;
		this.category = tag.category;
	}
}

module.exports = TagDto;
