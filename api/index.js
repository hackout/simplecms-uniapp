import config from "@/config"
import http from "@/utils/request"

export default {
	init: {
		url: `${config.API_URL}/public/init`,
		get: async function() {
			return await http.get(this.url)
		}
	},
	token: {
		url: `${config.API_URL}/wechat/mini/token`,
		post: async function(code) {
			return await http.post(this.url + `/${code}`);
		}
	}
}