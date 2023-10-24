import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PictureApi from "../../app/apis/PictureApi";
import { useSelector } from "react-redux";

const Preview = () => {
	const [images, setImages] = useState([]);
	const user = useSelector((state) => state.userReducer);
	const [loading, setLoading] = useState(true);
	const [age, setAge] = useState(0);

	useEffect(() => {
		PictureApi.getAllByUserId(user.uid).then((pictures) => {
			const updatedDisplay = [];
			pictures.forEach((picture, index) => {
				updatedDisplay[
					picture.index
				] = `data:${picture.mimetype};base64,${picture.base64data}`;
			});
			setImages(updatedDisplay);
			setAge(getUserAge());
			setLoading(false);
		});
	}, []);

	const getUserAge = () => {
		const birthDate = new Date(user.dob);
		const now = new Date();

		let age = now.getFullYear() - birthDate.getFullYear();

		if (
			now.getMonth() < birthDate.getMonth() ||
			(now.getMonth() === birthDate.getMonth() &&
				now.getDay() < birthDate.getDay())
		) {
			age--;
		}
		return age;
	};

	return (
		<div className="preview">
			<div className="carousel-container">
				{loading ? (
					<div></div>
				) : (
					<Carousel>
						{images.map((image, index) => {
							return (
								<div key={index}>
									<img className="carousel-img" src={image} />
									<p className="legend">
										{user.login} {age} {user.location} <br />
										{user.tags.map((tag, index) => {
											return " | " + tag.name + " | ";
										})}
										<br />
										{user.bio}
									</p>
								</div>
							);
						})}
					</Carousel>
				)}
			</div>
		</div>
	);
};

export default Preview;
