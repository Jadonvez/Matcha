import { useRef } from "react";
import default_pp from "../../assets/images/default_pp.jpg";

const PhotoUploaderCard = ({ image, onDelete, onAdd }) => {
	const hiddenAddFileInput = useRef(null);

	const handleAddClick = (e) => {
		hiddenAddFileInput.current.click();
	};

	const handleAddChange = (e) => {
		const file = e.target.files[0];
		onAdd(file);
	};

	return (
		<div className="photo-uploader-card">
			{image ? (
				<div className="image-container">
					<img src={image} alt="your lovely face" />
					<button className="delete-btn" onClick={onDelete}>
						x
					</button>
				</div>
			) : (
				<div className="image-container">
					<img src={default_pp} alt="your face is missing !" />
					<button type="button" onClick={handleAddClick} className="add-btn">
						+
					</button>
					<input
						type="file"
						onChange={handleAddChange}
						ref={hiddenAddFileInput}
						style={{ display: "none" }}
					/>
				</div>
			)}
		</div>
	);
};

export default PhotoUploaderCard;
