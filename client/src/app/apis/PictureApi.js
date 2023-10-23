import { api } from "./configs/axiosConfigs";

const PictureApi = {
	getAllByUserId: async function (id) {
		const response = await api.request({
			url: `picture/${id}`,
			method: "GET",
		});
		return response.data;
	},
};

export default PictureApi;
