import dayjs from "dayjs";
import config from "@/config";

const setData = (key, data) => {
	if (!data) {
		uni.removeStorageSync(key)
	} else {
		const params = {
			data: data
		}
		uni.setStorageSync(key, JSON.stringify(params))
	}
}

const getData = (key, def = null) => {
	const data = uni.getStorageSync(key)
	if (!data) return def;
	return JSON.parse(data).data;
}
const dateFormat = function(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
	if (!date || (typeof date != 'string' && typeof date != 'number')) return '-'
	return dayjs(date).format(fmt)
}

const coupon = function(str) {
	return (str / 10).toFixed(1)
}

const forContent = (str) => {
	var richtext = str;
	const regex = new RegExp('<img', 'gi');
	const regex2 = new RegExp(' src="', 'gi');
	const regex3 = new RegExp('<p>', 'gi');
	var richtext2 = richtext.replace(regex, `<img style="max-width: 100%;display:block;margin:0;height:auto;"`);
	var richtext3 = richtext2.replace(regex3, `<p style="margin:0">`);
	return richtext3
}

const isArray = (arr) => {
	return Array.isArray(arr)
}

const isObject = (arr) => {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

const decodePos = (lat,lng) => {
	let uri = `https://apis.map.qq.com/ws/geocoder/v1/`
	return new Promise((resolve, reject) => {
		uni.request({
			url: uri,
			method: 'GET',
			withCredentials: true,
			data: {
				location: `${lat},${lng}`,
				key: config.QQMAP_KEY
			},
			timeout: 5000,
			success: (response) => {
				resolve(response.data)
			},
			fail: (error) => {
				reject(error)
			}
		})
	})
}

const cloneObj = (obj) => {
	return JSON.parse(JSON.stringify(obj))
}

export default {
	setData,
	getData,
	dateFormat,
	coupon,
	forContent,
	isArray,
	isObject,
	decodePos,
	cloneObj
}