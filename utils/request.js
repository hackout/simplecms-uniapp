import sysConfig from "@/config";
import utils from './index.js'
import store from '@/store'

const getHeader = (uuid = null) => {
	return {
		"Accept-Language": 'zh-cn',
		"X-Requested-With": 'XMLHttpRequest',
		"Accept-Encoding": 'gzip,deflate',
		"Authorization": sysConfig.TOKEN_PREFIX + utils.getData('token', sysConfig.TOKEN),
		"X-Device-Finger": uuid
	}
}

/**
 * 处理Succes内容
 */
const resolveSuccess = (response, resolve) => {
	if (response.statusCode == 401) {
		store.dispatch('loginUser')
		resolve({
			code: 402,
			data: null
		})
	}
	if (response.statusCode == 500) {
		uni.showToast({
			icon: "error",
			title: "网络连接错误"
		})
	}
	if (response.statusCode == 200) {
		if (response.data != null || utils.isObject(response.data)) {
			resolve(response.data)
		} else {
			resolve(response.data == null ? null : JSON.parse(response.data))
		}
	}
}

const http = {
	get: function(url, params = {}) {
		let uuid = utils.getData('uuid');
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: 'GET',
				header: getHeader(uuid),
				withCredentials: false,
				data: params,
				timeout: sysConfig.TIMEOUT,
				success: (response) => {
					resolveSuccess(response, resolve)
				},
				fail: (error) => {
					reject(error)
				}
			})
		})
	},
	post: function(url, params = {}) {
		let uuid = utils.getData('uuid');
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: 'POST',
				header: getHeader(uuid),
				withCredentials: false,
				data: params,
				timeout: sysConfig.TIMEOUT,
				success: (response) => {
					resolveSuccess(response, resolve)
				},
				fail: (error) => {
					reject(error)
				}
			})
		})
	},
	put: function(url, params = {}) {
		let uuid = utils.getData('uuid');
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: 'PUT',
				header: getHeader(uuid),
				withCredentials: false,
				data: params,
				timeout: sysConfig.TIMEOUT,
				success: (response) => {
					resolveSuccess(response, resolve)
				},
				fail: (error) => {
					reject(error)
				}
			})
		})
	},
	delete: function(url, params = {}) {
		let uuid = utils.getData('uuid');
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: 'DELETE',
				header: getHeader(uuid),
				withCredentials: false,
				data: params,
				timeout: sysConfig.TIMEOUT,
				success: (response) => {
					resolveSuccess(response, resolve)
				},
				fail: (error) => {
					reject(error)
				}
			})
		})
	},
	upload: function(url, files, data = {}) {
		let uuid = utils.getData('uuid');
		let file = {
			name: '',
			file: ''
		}
		if (typeof files == 'object') {
			file = files
		} else {
			file.file = files
			file.name = 'file'
		}
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: url,
				name: file.name,
				filePath: file.file,
				header: getHeader(uuid),
				withCredentials: false,
				formData: data,
				timeout: sysConfig.TIMEOUT,
				success: (response) => {
					resolveSuccess(response, resolve)
				},
				fail: (error) => {
					reject(error)
				}
			});
		})
	}
}

export default http;