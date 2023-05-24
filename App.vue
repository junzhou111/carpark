<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	html,
	body {
		height: 100%;
		background-color: #eee
	}

	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	// 引入阿里巴巴矢量图标库
	@import '/static/icon/iconfont.css';
</style>