import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../app/apis/UserApi";

const SignInform = () => {
	const [inputs, setInputs] = useState({
		mail: "",
		password: "",
	});
	const [valid, setValid] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const validateEmail = () => {
			var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
			if (inputs.mail && inputs.mail.match(mailformat)) {
				return true;
			}
			return false;
		};

		if (!validateEmail() || inputs.password.length < 8) {
			setValid(false);
		} else {
			setValid(true);
		}
	}, [inputs]);

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await UserAPI.login(inputs);
			if (res.status === 200) {
				navigate("/", { replace: true });
			}
		} catch (err) {
			console.log(err.response.data);
		}
	};

	return (
		<div className="sign-in-container">
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					name="mail"
					onChange={(e) => handleChange(e)}
					id="email"
					placeholder="Adresse e-mail"
				/>
				<input
					type="password"
					name="password"
					onChange={(e) => handleChange(e)}
					id="password"
					placeholder="Mot de passe"
				/>
				<input
					id={valid ? "submit-valid" : "submit"}
					disabled={!valid}
					type="submit"
					value="Se connecter"
				/>
			</form>
		</div>
	);
};

export default SignInform;
