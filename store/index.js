import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/utils'
import api from '@/api'
import config from '@/config'

Vue.use(Vuex)
const defaultUserInfo = {
	uid: null,
	nickname: null,
	name: null,
	birth_date: null,
	emergency_contact: null,
	emergency_phone: null,
	emergency_address: null,
	openid: null,
	mobile: null,
	avatar: null,
	is_leader: false,
	location: {
		lat: 0,
		lng: 0,
		city_id: 0
	}
}
const defaultSysConfig = {
	company: '重庆畅店通科技有限公司',
	ga_ipc: '渝公网安备50022602000796号',
	registration_agreement: '',
	service_agreement: '',
	privacy_agreement: ''
}

const store = new Vuex.Store({
	state: {
		hasLogin: utils.getData('hasLogin', false),
		hasInit: utils.getData('hasInit', false),
		openid: utils.getData('openid', null),
		sysConfig: utils.getData('sysConfig', defaultSysConfig),
		user: utils.getData('user', defaultUserInfo)
	},
	mutations: {
		login(state) {
			state.hasLogin = true;
			utils.setData('hasLogin', true)
		},
		init(state) {
			state.hasInit = true
			utils.setData('hasInit', true)
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
			state.user = defaultUserInfo
			utils.setData('openid')
			utils.setData('hasLogin')
			utils.setData('user')
		},
		openid(state, openid) {
			state.openid = openid
			utils.setData('openid', openid)
		},
		location(state, location) {
			state.location = location
		},
		user(state, userInfo) {
			state.user = userInfo
			utils.setData('user', userInfo)
		},
		sysConfig(state, sysConfig) {
			state.sysConfig = sysConfig
			utils.setData('sysConfig', sysConfig)
		}
	},
	actions: {
		getUser({
			user
		}) {
			return user
		},
		loginUser({
			commit,
			state
		}) {
			commit('logout')
			uni.login({
				provider: "wechat",
				success: async (data) => {
					if (data.errMsg == 'login:ok') {
						let res = await api.token.post(data.code)
						if (res.code == config.SUCCESS) {
							if (res.data.user.openid) {
								utils.setData('token', res.data.token)
								utils.setData('uuid', res.data.finger)
								commit('openid', res.data.user.openid)
								commit('login')
								commit('user', res.data.user)
								uni.reload()
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: res.message
							})
						}
					}
				},
				fail: (err) => {
					console.log('login 接口调用失败，将无法正常使用开放接口等服务', err)
				}
			})
		}
	}
})

export default store