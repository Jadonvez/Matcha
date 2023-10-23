const { api } = require("./configs/axiosConfigs");

const TagApi = {
	getAll: async function () {
		const response = await api.request({
			url: "tag/",
			method: "GET",
		});
		return response.data;
	},
};

export default TagApi;
