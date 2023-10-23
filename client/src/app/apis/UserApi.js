import { api } from "./configs/axiosConfigs";

const UserAPI = {
	getAll: async function () {
		const response = await api.request({
			url: "/user/all",
			method: "GET",
		});
		return response.data;
	},
	getById: async function (id) {
		const response = await api.request({
			url: `/user/${id}`,
			method: "GET",
		});
		return response.data;
	},
	getCurrent: async function () {
		const response = await api.request({
			url: `/user/current`,
			method: "GET",
		});
		return response.data;
	},
	login: async function (inputs) {
		try {
			const response = await api.request({
				url: "/user/login",
				method: "POST",
				data: inputs,
			});
			return response;
		} catch (err) {
			throw err;
		}
	},
	create: async function (inputs) {
		try {
			const response = await api.request({
				url: "/user",
				method: "POST",
				data: inputs,
			});
			return response;
		} catch (err) {
			throw err;
		}
	},
	confirmEmail: async function (uid, token) {
		try {
			const response = await api.request({
				url: `/user/${uid}/confirm_email/${token}`,
				method: "GET",
			});
			return response;
		} catch (err) {
			throw err;
		}
	},
};

export default UserAPI;
