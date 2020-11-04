<template>
	<div id="app">
		<nav class="navbar navbar-expand-md navbar-dark bg-dark">
			<router-link class="navbar-brand mx-auto" to="/">
				<img src="/images/Ru-Me-small.png" width=40px height=40px/>Ru-Me
			</router-link>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="navbar-collapse collapse w-100 order-1 dual-collapse2">
				<ul class="navbar-nav ml-auto" v-if="shared.me!=undefined">
					<li class="nav-item">
						<router-link class="nav-link" to="/dashboard" disabled>Dashboard</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/browse">Browse</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/profile">{{shared.me.username}}'s Profile</router-link>
					</li>
				</ul>
			</div>
		</nav>
		<router-view/>
	</div>
</template>

<style>
</style>

<script>
export default {
	computed: {
		shared() {
			return this.$root.$data;
		}
	}
}
</script>