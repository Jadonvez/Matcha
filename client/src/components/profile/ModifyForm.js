import { useEffect, useState } from "react";
import PhotoUploaderCard from "./PhotoUploaderCard";
import TagsPopUp from "./TagsPopUp";
import { api } from "../../app/apis/configs/axiosConfigs";
import { useDispatch, useSelector } from "react-redux";
import PictureApi from "../../app/apis/PictureApi";
import {
	updateUserBio,
	updateUserLocation,
	updateUserTags,
} from "../../app/slices/userSlice";

const ModifyForm = () => {
	const [images, setImages] = useState([null, null, null, null, null]);
	const [displayedImages, setDisplayedImages] = useState([
		null,
		null,
		null,
		null,
		null,
	]);
	const [deletedImages, setDeletedImages] = useState([]);
	const [biography, setBiography] = useState("");
	const [tags, setTags] = useState([]);
	const [location, setLocation] = useState("");
	const [checked, setChecked] = useState(false);
	const [showPopUp, setShowPopUp] = useState(false);
	const user = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();

	const deleteImage = async (index) => {
		const updatedImages = [...images];
		updatedImages[index] = null;
		setImages(updatedImages);

		const updatedDisplayedImages = [...displayedImages];
		updatedDisplayedImages[index] = null;

		const updateDeleted = [...deletedImages];
		updateDeleted.push(index);
		setDeletedImages(updateDeleted);

		setDisplayedImages(updatedDisplayedImages);
	};

	const addImage = (index, file) => {
		const updatedImages = [...images];
		updatedImages[index] = file;
		setImages(updatedImages);

		const reader = new FileReader();
		reader.onload = (e) => {
			const updatedImages = [...displayedImages];
			updatedImages[index] = e.target.result;
			setDisplayedImages(updatedImages);
		};

		reader.readAsDataURL(file);
	};

	const togglePopUp = () => {
		setShowPopUp(!showPopUp);
	};

	const updateTags = (tagsToUpdate) => {
		const array = [];
		for (const t of tagsToUpdate) {
			array.push(t);
		}
		setTags(array);
	};

	useEffect(() => {
		PictureApi.getAllByUserId(user.uid).then((pictures) => {
			const updatedDisplay = [...displayedImages];
			pictures.forEach((picture, index) => {
				updatedDisplay[
					picture.index
				] = `data:${picture.mimetype};base64,${picture.base64data}`;
			});
			setBiography(user.bio);
			setLocation(user.location);
			setDisplayedImages(updatedDisplay);
			setTags(user.tags);
		});
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();

		images.forEach((file, index) => {
			formData.append(`images[${index}]`, file);
		});
		formData.append("biography", biography);
		formData.append("location", location);
		formData.append("deleted", deletedImages);

		tags.forEach((tag, index) => {
			formData.append(`tag[${index}]`, tag.uid);
		});

		const res = await api.post("/user/profile", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		dispatch(updateUserLocation(location));
		dispatch(updateUserBio(biography));
		dispatch(updateUserTags(tags));
	};

	const handleCheckbox = () => {
		setChecked(!checked);
	};

	const handleBiographyChange = (e) => {
		setBiography(e.target.value);
	};

	const handleLocationChange = (e) => {
		setLocation(e.target.value);
	};

	return (
		<div className="modify-form-body">
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="photos">
					<h2>Photos</h2>
					<div className="photo-cards">
						{displayedImages.map((image, index) => (
							<div key={index}>
								<PhotoUploaderCard
									image={image}
									onDelete={() => deleteImage(index)}
									onAdd={(file) => addImage(index, file)}
								/>
							</div>
						))}
					</div>
				</div>
				<div className="modify-form-informations">
					<div className="biography">
						<h2>Biographie</h2>
						<textarea
							placeholder="Ecris nous une jolie biographie"
							name="biography"
							onChange={handleBiographyChange}
							value={biography}
						/>
					</div>
					<div className="interests">
						<h2>Passions</h2>
						<div className="tags">
							{tags.map((tag, index) => (
								<div className="tag" key={index}>
									{tag.name}
								</div>
							))}
						</div>
						<button type="button" onClick={togglePopUp}>
							Choisir centres d'intérêts
						</button>
						{showPopUp ? (
							<TagsPopUp
								onClose={togglePopUp}
								onValidate={updateTags}
								currentTags={tags}
							/>
						) : (
							<div></div>
						)}
					</div>
					<div className="location">
						<h2>Localisation</h2>
						<label>Vit ici :</label>
						<input
							type="text"
							disabled={checked}
							onChange={handleLocationChange}
							value={location}
						/>
						<label>
							Activer localisation automatique
							<input
								type="checkbox"
								checked={checked}
								onChange={handleCheckbox}
							/>
						</label>
					</div>
				</div>
				<button type="submit" className="register-btn">
					Enregistrer
				</button>
			</form>
		</div>
	);
};

export default ModifyForm;
