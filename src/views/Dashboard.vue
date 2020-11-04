<template>
	<div class="home">
		<div class="text-page">
			<h1>Welcome, {{shared.profileName(shared.me)}}</h1>
			<h2>Rooming Request Inbox</h2>
			<div class="requests-inbox">
				<p><i>These people want to room with you!</i></p>
				<router-link v-for="request in me.inbox" :to="`/person/${request.sender}`" :key="request.sender">
					<p>{{shared.profileName(shared.profileWithUsername(request.sender))}}</p>
					<button @click.prevent="reject(request)" class="reject button">Reject</button>
					<button @click.prevent="accept(request)" class="accept button">Accept</button>
				</router-link>
			</div>
			<h2>Rooming Request Outbox</h2>
			<div class="requests-inbox">
				<p><i>These people can see your request in their inbox.  Wait for their response!</i></p>
				<router-link v-for="requestee in shared.requestsFromUser(me.username)" :to="`/person/${requestee.username}`" :key="requestee.username">
					<p>{{shared.profileName(requestee)}}</p>
					<button @click.prevent="cancel(requestee)" class="reject button">Cancel</button>
				</router-link>
			</div>
			<p class="forward-directing">
				<router-link to="/browse" class="button">Look for more options!</router-link>	
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
			return this.shared.me;
		},
		shared() {
			return this.$root;
		}
	},
	methods: {
		accept() {
			alert("If this app were completed, you would be taken to another page.");
		},
		reject(request) {
			const index = this.shared.me.inbox.indexOf(request);
			this.shared.me.inbox.splice(index, 1);
		},
		cancel(requestee) {
			const index = requestee.inbox.find(req => req.sender === this.me.username);
			requestee.inbox.splice(index, 1);
		}
	}
}
</script>
