import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { clearUser } from "../app/slices/userSlice";

const Logout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		Cookies.remove("access_token");
		navigate("/connexion");
		dispatch(clearUser());
	}, []);
};

export default Logout;
