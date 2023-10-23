import { useEffect, useState } from "react";
import UserAPI from "../app/apis/UserApi";
import { useNavigate } from "react-router-dom";

const ConfirmEmail = () => {
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const confirmEmail = async () => {
			const params = new URLSearchParams(window.location.search);
			const token = params.get("token");
			const uid = params.get("uid");
			try {
				const res = await UserAPI.confirmEmail(uid, token);
				if (res.status === 200) {
					setMessage("Email confirmé ! Redirection en cours");

					setTimeout(() => {
						navigate("/");
					}, 3000);
				}
			} catch (err) {
				console.log(err);
				setMessage(
					"Une erreur est survenue, vous allez être redirigé vers l'écran de connexion"
				);

				setTimeout(() => {
					navigate("/connexion");
				}, 3000);
			}
		};

		confirmEmail();
	}, [navigate]);
	return (
		<div className="confirmation-email">
			<h1>Confirmation email</h1>
			<h2>{message}</h2>
		</div>
	);
};

export default ConfirmEmail;
