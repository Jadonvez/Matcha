import Home from "../layouts/Home";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import UserAPI from "../app/apis/UserApi";
import { useNavigate } from "react-router-dom";
import { setUser } from "../app/slices/userSlice";

const Connected = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const fetchCurrentUser = useCallback(() => {
		UserAPI.getCurrent()
			.then((user) => {
				dispatch(setUser(user));
			})
			.catch((err) => {
				navigate("/logout");
			});
	}, [dispatch, navigate]);

	useEffect(() => {
		fetchCurrentUser();
	}, [fetchCurrentUser]);

	return <Home />;
};

export default Connected;
