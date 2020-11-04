<template>
<div>
	<div class="brandlogo splashsection">
		<img class="splash-logo" src="images/Ru-Me-large.png"/>
		<h1>Ru-Me</h1>
		<p>We have helped hundreds find the perfect roommate.</p>
		<form @submit.prevent v-if="shared.me==undefined">
			<p><i>Try username=bbhintze and password=12345</i></p>
			<label for="username">Username</label><input id="username" v-model="username">
			<br>
			<label for="password">Password</label><input type="password" id="password" @keyup.enter="submit" v-model="password">
			<br>
			<button class="button" @click="submit">Log in</button>
		</form>
		<div v-else>
			<button class="button" @click="logOut">Log out</button>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			password: ''
		};
	},
	computed: {
		shared() {
			return this.$root.$data;
		}
	},
	methods: {
		submit() {
			const possibleMe = this.shared.profiles.find(p => p.username === this.username);
			if (possibleMe && possibleMe.password === this.password) {
				this.shared.me = possibleMe;
				this.$router.push({ path: '/dashboard' })
			}
		},
		logOut() {
			this.shared.me = undefined;
		}
	}
}
</script>