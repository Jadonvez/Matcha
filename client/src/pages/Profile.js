import { useState } from "react";
import ModifyForm from "../components/profile/ModifyForm";
import Preview from "../components/profile/Preview";

const Profile = () => {
	const [modifyModal, setModifyModal] = useState(true);

	const handleModals = (e) => {
		if (e.target.id === "modify") {
			setModifyModal(true);
		} else if (e.target.id === "preview") {
			setModifyModal(false);
		}
		console.log("modify");
	};
	return (
		<div className="profile-page">
			<ul className="profile-selector">
				<li
					className={
						modifyModal ? "li-profile-selector-active" : "li-profile-selector"
					}
					onClick={handleModals}
					id="modify"
				>
					Modifier
				</li>
				<li
					className={
						modifyModal ? "li-profile-selector" : "li-profile-selector-active"
					}
					onClick={handleModals}
					id="preview"
				>
					Aperçu
				</li>
			</ul>
			{modifyModal ? <ModifyForm /> : <Preview />}
		</div>
	);
};

export default Profile;
