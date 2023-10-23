import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
	withCredentials: true,
	baseURL: "http://localhost:5001/api/",
});

api.interceptors.request.use((config) => {
	const token = Cookies.get("access_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const statusCode = error.response.status;
		if (statusCode === 401 || statusCode === 403) {
			window.location = "/logout";
		}
		throw error;
	}
);
