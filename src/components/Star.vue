<template>
	<div class="star">
		<div class="star-empty">
			<i class="icon-star-empty" v-for="n in 5"></i>
		</div>
		<div class="star-full">
			<i class="icon-star-full" v-for="n in starsCount"></i><i class="icon-star-half" v-if="stars >= 10 && stars[1] !== '0'"></i>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'star',
		props: {
			stars: {
				type: Number
			},
			color: {
				type: String
			}
		},
		computed: {
			starsCount () {
				return this.stars >= 10 ? Math.floor(this.stars/10) : this.stars
			}
		}
	}
</script>

<style lang="scss">
	.star {
		display: inline-block;
		position: relative;
		i {
			font-size: 20px;
		}
		.star-full {
			position: absolute;
			top: 0;
			//color: yellow;
		}
		.star-empty {
			//color: gray;
		}
	}
</style>