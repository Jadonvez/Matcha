import { useState, useEffect } from "react";
import UserAPI from "../../app/apis/UserApi";

const SignUpForm = () => {
	const [inputs, setInputs] = useState({
		name: "",
		firstname: "",
		mail: "",
		login: "",
		password: "",
		dob: "",
		gender: "",
		orientation: "",
	});
	const [valid, setValid] = useState(false);

	useEffect(() => {
		const validateEmail = () => {
			var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
			if (inputs.mail && inputs.mail.match(mailformat)) {
				return true;
			}
			return false;
		};

		const validatePassword = () => {
			var strongRegex =
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
			if (inputs.password && inputs.password.match(strongRegex)) {
				return true;
			}
			return false;
		};

		const validateDate = () => {
			var dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
			if (inputs.dob && inputs.dob.match(dateRegex)) {
				return true;
			}
			return false;
		};

		const validategender = () => {
			if (inputs.gender === "Homme" || inputs.gender === "Femme") {
				return true;
			}
			return false;
		};

		const validateOrientation = () => {
			if (
				inputs.orientation === "Hétérosexuel" ||
				inputs.orientation === "Homosexuel" ||
				inputs.orientation === "Bisexuel"
			) {
				return true;
			}
			return false;
		};

		if (
			inputs.name.length === 0 ||
			inputs.firstname.length === 0 ||
			inputs.login.length === 0 ||
			!validateEmail() ||
			!validatePassword() ||
			!validateDate() ||
			!validategender() ||
			!validateOrientation()
		) {
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
			const res = await UserAPI.create(inputs);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="sign-up-container">
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					name="name"
					type="text"
					onChange={(e) => handleChange(e)}
					id="name"
					placeholder="Nom"
					required
				/>
				<input
					name="firstname"
					type="text"
					onChange={(e) => handleChange(e)}
					id="firstname"
					placeholder="Prenom"
					required
				/>
				<input
					name="login"
					type="text"
					onChange={(e) => handleChange(e)}
					id="login"
					placeholder="Login"
					required
				/>
				<input
					name="mail"
					type="email"
					onChange={(e) => handleChange(e)}
					id="email"
					placeholder="Email"
					required
				/>
				<input
					name="password"
					type="password"
					onChange={(e) => handleChange(e)}
					id="password"
					placeholder="Password"
					required
				/>
				<input
					name="dob"
					id="dob"
					onChange={(e) => handleChange(e)}
					type="date"
					required
				/>
				<select
					name="gender"
					onChange={(e) => handleChange(e)}
					id="gender"
					required
				>
					<option value="">genre</option>
					<option>Homme</option>
					<option>Femme</option>
					<option>Autre</option>
				</select>
				<select
					name="orientation"
					onChange={(e) => handleChange(e)}
					id="orientation"
					required
				>
					<option value="">Préférences sexuelles</option>
					<option>Hétérosexuel</option>
					<option>Homosexuel</option>
					<option>Bisexuel</option>
				</select>
				<input
					id={valid ? "submit-valid" : "submit"}
					type="submit"
					disabled={!valid}
					value="S'inscrire"
				/>
			</form>
		</div>
	);
};

export default SignUpForm;
