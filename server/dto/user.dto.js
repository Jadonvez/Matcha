class UserDto {
	constructor(user, tags) {
		this.uid = user.uid;
		this.login = user.login;
		this.mail = user.mail;
		this.name = user.name;
		this.firstname = user.firstname;
		this.dob = user.dob;
		this.gender = user.gender;
		this.orientation = user.orientation;
		this.bio = user.bio;
		this.location = user.location;
		this.tags = tags;
	}
}

module.exports = UserDto;
