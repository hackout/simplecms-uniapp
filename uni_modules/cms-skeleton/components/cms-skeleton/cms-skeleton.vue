<template>
	<view class="skeleton">
		<view v-if="!loaded" class="skeleton-load">
			<view class="skeleton-load-item first"></view>
			<view class="skeleton-load-item"></view>
			<view class="skeleton-load-item last"></view>
			<view class="skeleton-load-item"></view>
			<view class="skeleton-load-item"></view>
			<view class="skeleton-load-item first"></view>
			<view class="skeleton-load-item"></view>
			<view class="skeleton-load-item last"></view>
			<view class="skeleton-load-item"></view>
			<view class="skeleton-load-item"></view>
			<view class="skeleton-load-item"></view>
		</view>
		<slot v-else></slot>
		<view class="bottom-empty"></view>
		<privacy-popup :visit="privacy"></privacy-popup>
	</view>
</template>
<script>
	import privacyPopup from './privacy-popup.vue'
	export default {
		components: {
			privacyPopup
		},
		props: {
			showPrivacy: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				loaded: false,
				retry_count: 0,
				privacy: this.showPrivacy
			}
		},
		watch: {
			showPrivacy(val){
				this.privacy = val
			}
		},
		created() {
			this.$nextTick(() => {
				this.getUserInfo()
			})
		},
		methods: {
			async getUserInfo() {
				uni.showLoading()
				let res = await this.$api.profile.get()
				uni.hideLoading()
				if (res.code == this.$config.SUCCESS) {
					this.$store.commit('user', res.data)
					this.loaded = true
				} else
				if (res.code == this.$config.RETRY) {
					if (this.retry_count == 3) {
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
					} else {
						this.retry_count++
						setTimeout(() => {
							this.getUserInfo()
						}, 2000)
					}
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
			}
		}
	}
</script>
<style lang="scss" scoped>
	.skeleton {
		width: 750rpx;
		height: 100vh;
		box-sizing: border-box;

		&-load {
			width: 100%;
			height: 100%;
			padding: 12rpx 24rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			&-item {
				width: 100%;
				height: 48rpx;
				margin: 16rpx 0;
				border-radius: 24rpx;
				background: linear-gradient(90deg, $uni-border-color 25%, $uni-border-color 37%, $uni-bg-color-grey 63%);
				background-size: 400% 100%;
				animation: skeletonLoading 1.4s ease infinite;

				&.first {
					width: 50%;
				}

				&.last {
					width: 75%;
				}
			}
		}
	}

	@keyframes skeletonLoading {
		0% {
			background-position: 100% 50%
		}

		to {
			background-position: 0 50%
		}
	}
</style>