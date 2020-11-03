<template>
<p class="stars">
	{{interior}}
</p>
</template>

<script>
export default {
	name: 'Rating',
	props: {
		max: Number,
		value: Number,
	},
	methods: {
		update() {
		}
	},
	computed: {
		interior() {
			if (this.value == -1) {
				return '👎';
			}
			return '★'.repeat(this.value) + '☆'.repeat(this.max - this.value);
		}
	},/*
	watch: {
		max: {
			update();
		},
		value: {
			update();
		}
	}*/
}
</script>