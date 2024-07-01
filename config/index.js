let DEFAULT_CONFIG = {
	//标题
	APP_NAME: '应用名称',
	APP_SLOGEN: '应用说明',
	//接口地址
	API_URL: 'https://后台域名/api',
	//请求超时
	TIMEOUT: 10000,

	//TokenName
	TOKEN_NAME: "Authorization",

	//Token前缀，注意最后有个空格，如不需要需设置空字符串
	TOKEN_PREFIX: "Bearer ",
	TOKEN: '0|http://www.cdiantong.cn',
	SUCCESS: 200,
	RETRY: 402,
	QQMAP_KEY: 'HE6BZ-AIMKD-JJM4K-HF44N-JE76Q-NCBNE'
}

if (process.env.NODE_ENV !== 'production') {
	DEFAULT_CONFIG.API_URL = 'http://localhost:8000/api'
}

export default DEFAULT_CONFIG