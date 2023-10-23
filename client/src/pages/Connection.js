import Navbar from "../components/Navbar";
import birds from "../assets/images/birds.svg";
import { useState } from "react";
import SignUpForm from "../components/connection/SignUpForm";
import SignInform from "../components/connection/SignInForm";

const Connection = () => {
	const [signUpModal, setSignUpModal] = useState(true);

	const handleModals = (e) => {
		if (e.target.id === "register") {
			setSignUpModal(true);
		} else if (e.target.id === "login") {
			setSignUpModal(false);
		}
	};
	return (
		<div className="connection">
			<Navbar />
			<div className="form-container">
				<img
					src={birds}
					alt="Oisillons transis d'amour profond"
					className="birds-img"
				/>
				<ul className="connection-type">
					<li
						className={signUpModal ? "li-connection-active" : "li-connection"}
						onClick={handleModals}
						id="register"
					>
						S'inscrire
					</li>
					<li
						className={signUpModal ? "li-connection" : "li-connection-active"}
						onClick={handleModals}
						id="login"
					>
						Se connecter
					</li>
				</ul>
				{signUpModal ? <SignUpForm /> : <SignInform />}
			</div>
		</div>
	);
};

export default Connection;
