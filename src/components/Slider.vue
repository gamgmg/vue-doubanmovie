<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'

	export default {
		name: 'slider',
		props: {
			direction: {
				type: String,
				// validator (value) {
				// 	return [ 'horizontal', 'vertical' ].indexOf(value) !== 1
				// },
				default: 'horizontal'
			},
			refeash: {
				type: Boolean,
				default: false
			},
			click: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {
				slider: null
			}
		},
		mounted () {
			if(this.direction === 'horizontal'){
				this.setSliderWidth()
			}
			let slider = this.$refs.slider
			this.slider = new BScroll(slider, {
				scrollX: this.direction === 'horizontal',
				scrollY: this.direction === 'vertical',
				probeType: 3,
				click: this.click
			})
			this.refresh()
		},
		update () {
			if(this.slider && this.refresh){
				this.slider.refresh()
			}
		},
		methods: {
			setSliderWidth () {
				this.children = this.$refs.sliderGroup.children
				let width = 0
				for(let i=0; i<this.children.length; i++){
					let child = this.children[i]
					let style = getComputedStyle(child)
					width += Number(child.offsetWidth) + Number(style.marginRight.slice(0,-2))
				}
				this.$refs.sliderGroup.style.width = width + 'px'
			},
			refresh () {
				if(this.slider){
					this.slider.refresh()
				}
			}
		}
	}
</script>

<style lang="scss">
	.slider {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>