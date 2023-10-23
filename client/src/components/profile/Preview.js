import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PictureApi from "../../app/apis/PictureApi";
import { useSelector } from "react-redux";

const Preview = () => {
	const [images, setImages] = useState([]);
	const [biography, setBiography] = useState("");
	const [tags, setTags] = useState([]);
	const [location, setLocation] = useState("");
	const [carouselData, setCarouselData] = [];
	const user = useSelector((state) => state.userReducer);
	const [loading, setLoading] = useState(true);
	const [legend, setLegend] = useState("");

	useEffect(() => {
		PictureApi.getAllByUserId(user.uid).then((pictures) => {
			const updatedDisplay = [];
			pictures.forEach((picture, index) => {
				updatedDisplay[
					picture.index
				] = `data:${picture.mimetype};base64,${picture.base64data}`;
			});
			setBiography(user.bio);
			setLocation(user.location);
			setImages(updatedDisplay);
			setTags(user.tags);
			setLoading(false);
			console.log(user);
			getUserAge();
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
		<div>
			{loading ? (
				<div></div>
			) : (
				<Carousel>
					{images.map((image, index) => {
						return (
							<div key={index}>
								<img src={image} />
								<p className="legend">
									{user.login} {getUserAge()} {user.location} <br />
									{user.tags.map((tag, index) => {
										return " | " + tag.name + " | ";
									})}
									<br />
									{biography}
								</p>
							</div>
						);
					})}
				</Carousel>
			)}
		</div>
	);
};

export default Preview;
