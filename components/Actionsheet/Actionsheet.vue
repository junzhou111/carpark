<template>
	<view>
		<u-action-sheet :actions="color.list" @select="colorclick" :title="color.title" 
			@close="color.show=false" :show="color.show"></u-action-sheet>
		<view class="calendarinput" @click="colortextclick">
			<text v-text="color.value"></text>
			<u-icon size="20" name="arrow-down"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Actionsheet",
		data() {
			return {

			};
		},
		props: ['color'],
		mounted() {
			console.log("color", this.color);
		},
		methods: {
			// 显示颜色弹窗
			colortextclick(){
				this.$emit("colortext")
			},
			// 颜色弹窗选值
			colorclick(index){
				this.$emit("colorvalue",index)
			}
			
		}
	}
</script>

<style>

</style>