<script>
	export default {
		onLaunch: function() {
			const that = this;
			wx.getPrivacySetting({
				success(res) {
					that.globalData.privacyContractName = res.privacyContractName;
					if (res.needAuthorization) {
						that.globalData.showPrivacy = true;
					} else {
						that.globalData.showPrivacy = false;
					}
				}
			});
			if (!that.$store.state.hasInit) {
				that.initData()
			}
			if (!that.$store.state.hasLogin) {
				that.login()
			}
		},
		methods: {
			async initData() {
				let res = await this.$api.init.get()
				if (res.code == this.$config.SUCCESS) {
					this.$store.commit('init')
					this.$store.commit('sysConfig', res.data)
					let res1 = uni.getSystemInfoSync()
					this.$utils.setData('uuid', res1.deviceId)
				} else {
					uni.showToast({
						icon: "error",
						title: "启动小程序失败",
						success: () => {
							setTimeout(() => {
								uni.exitMiniProgram();
							}, 2000)
						},
						error() {
							console.log('退出小程序失败')
						}
					})
				}
			},
			login() {
				this.$store.dispatch('loginUser')
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			privacyContractName: '', //隐私协议的名字
			showPrivacy: false,
			county_code: 0
		},
	}
</script>

<style lang="scss">

</style>