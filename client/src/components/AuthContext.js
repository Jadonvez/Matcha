const { createContext, useState } = require("react");
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		let userProfile = localStorage.getItem("userProfile");
		if (userProfile) {
			return JSON.parse(userProfile);
		}
		return null;
	});
	const navigate = useNavigate();
	const login = async (payload) => {
		await axios.post("http://localhost:5001/user/login", payload, {
			withCredentials: true,
		});
		localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
		setUser(apiResponse.data);
		navigate("/");
	};

	return (
		<>
			<AuthContext.Provider value={{ user, login }}>
				{children}
			</AuthContext.Provider>
		</>
	);
};

export default AuthContext;
