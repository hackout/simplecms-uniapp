<template>
	<cdt-skeleton>
		<view class="index">
			<image src="/static/logo.png" mode=""></image>
			<text>SimpleCMS UniApp 前端</text>
		</view>
	</cdt-skeleton>
</template>

<script>
	export default {
		data() {
			return {
				sysConfig: this.$store.state.sysConfig
			};
		},
		onLoad() {
			this.$nextTick(() => {})
		},
		onShow() {
			this.$nextTick(() => {

			})
		},
		computed: {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	@import "@/scss/index/index.scss";
</style>