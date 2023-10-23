import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import TagApi from "../../app/apis/TagApi";

const TagsPopUp = ({ onClose, onValidate, currentTags }) => {
	const [tags, setTags] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);

	const selectTag = (index) => {
		const updatedTags = [...selectedTags];

		const i = updatedTags.findIndex((t) => t.uid === tags[index].uid);
		if (i !== -1) {
			updatedTags.splice(i, 1);
		} else if (updatedTags.length < 5) {
			updatedTags.push(tags[index]);
		}
		setSelectedTags(updatedTags);
	};

	const isSelected = (index) => {
		const i = selectedTags.find((t) => t.uid === tags[index].uid);
		return i !== undefined;
	};

	const validate = () => {
		onValidate(selectedTags);
		onClose();
	};

	useEffect(() => {
		TagApi.getAll().then((res) => {
			setTags(res);
			setSelectedTags(currentTags);
		});
	}, []);

	return (
		<div className="tags-pop-up">
			<div className="tags-pop-up-inner">
				<button type="button" className="close-btn" onClick={onClose}>
					X
				</button>
				<h2>Choisis tes passions</h2>
				<h3>{selectedTags.length} / 5 sélectionnées</h3>
				<div className="tags">
					{tags.map((tag, index) => (
						<div
							className={isSelected(index) === false ? "tag" : "selected-tag"}
							key={index}
							onClick={() => selectTag(index)}
						>
							{tag.name}
						</div>
					))}
				</div>
				<button type="button" onClick={validate} className="validate-btn">
					Valider
				</button>
			</div>
		</div>
	);
};

export default TagsPopUp;
