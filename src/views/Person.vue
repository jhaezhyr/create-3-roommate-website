<template>
	<div class="home">
		<div class="text-page">
			<CandidateViewer :me="shared.me" :candidate="candidate"/>
			<div class="hud-bottom-spacer"></div>
			<div class="hud-bottom">
				<button class="button" @click="back">Back</button>
				<button class="button" @click="accept" v-show="hasRequestedMe">Accept request...</button>
				<button class="button" @click="reject" v-show="hasRequestedMe">Reject request</button>
				<button class="button" @click="cancel" v-show="isMyRequested">Cancel request</button>
			</div>
		</div>
	</div>
</template>

<script>
import CandidateViewer from '@/components/CandidateViewer.vue'

export default {
	name: 'Person',
	components: {
		CandidateViewer
	},
	props: {
	},
	data() {
		return {
			candidate: Object
		};
	},
	computed: {
		shared() { return this.$root.$data; },
		hasRequestedMe() {
			return (this.shared.me.inbox.find(r => (r.sender === this.candidate.username)) != undefined)
		},
		isMyRequested() {
			return (this.candidate.inbox.find(r => (r.sender === this.shared.me.username)) != undefined);
		}
	},
	methods: {
		back() {
			this.$router.go(-1);
		},
		accept() {
			alert("Good job, you've accepted a housing request!  Now what?")
		},
		reject() {
			const index = this.shared.me.inbox.find(req => req.sender === this.candidate.username);
			this.shared.me.inbox.splice(index, 1);
			this.$router.push({ path: '/dashboard' });
		},
		cancel() {
			let requestee = this.candidate;
			const index = requestee.inbox.find(req => req.sender === this.shared.me.username);
			requestee.inbox.splice(index, 1);
			this.$router.push({ path: '/dashboard' });
		}
	},
	created() {
		this.candidate = this.shared.profileWithUsername(this.$route.params.username);
	}
}
</script>
