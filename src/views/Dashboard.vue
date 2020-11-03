<template>
	<div class="home">
		<div class="text-page">
			<h1>Rooming requests</h1>
			<div class="requests-inbox">
				<a v-for="request in me.inbox" href="#" :key="request.sender">
					<p>{{root.profileName(root.profileWithUsername(request.sender))}}</p>
					<button class="accept button">Accept</button>
				</a>
			</div>
			<p class="forward-directing">
				<a href="browse.html" class="button">Look for more options!</a>	
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Dashboard',
	components: {
	},
	computed: {
		me() {
			return this.$root.$data.me;
		},
		root() {
			return this.$root;
		}
	}
}
</script>
