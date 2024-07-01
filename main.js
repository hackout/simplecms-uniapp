import App from './App'
import store from './store'
import api from './api'
import config from './config'
import utils from './utils'
import validation from '@/utils/validation.js'
import {
	mixin
} from './utils/mixin.js'
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.mixin(mixin)
		.use(store)
	app.config.globalProperties.$api = api
	app.config.globalProperties.$config = config
	app.config.globalProperties.$utils = utils
	app.config.globalProperties.$validation = validation
	return {
		app
	}
}