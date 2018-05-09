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
				validator (value) {
					return [ 'horizontal', 'vertical' ].indexOf(value) !== 1
				},
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
			this.setSliderWidth()
			let slider = this.$refs.slider
			this.slider = new BScroll(slider, {
				scrollX: this.direction === 'horizontal',
				scrollY: this.direction === 'vertical',
				probeType: 3,
				click: this.click
			})
		},
		update () {
			if(this.bScroll && this.refresh){
				this.bScroll.refresh()
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
				if(this.bScroll){
					this.bScroll.refresh()
				}
			}
		}
	}
</script>

<style lang="scss">
	.slider {
		width: 100%;
		overflow: hidden;
		.slider-group {
			padding: 0 40px;
		}
	}
</style>