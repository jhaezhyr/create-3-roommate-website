<template>
	<div class="home">
		<div class="text-page option" v-if="candidate != undefined">
			<CandidateViewer :me="shared.me" :candidate="candidate"/>
			<div class="hud-bottom-spacer"></div>
			<div class="hud-bottom">
				<button class="button" @click="request" v-if="canRequestThisCandidate">Request to room with {{shared.profileName(candidate)}}</button>
				<button class="button" @click="cancel" v-else>Cancel request to room with {{shared.profileName(candidate)}}</button>
				<button class="button" @click="reject">Next option</button>
			</div>
		</div>
		<div class="text-page option" v-else>
			<h1>You're outta options, bub!</h1>
			<button class="button" @click="clearRejected">Show me those options again...</button>
		</div>
	</div>
</template>

<script>
import CandidateViewer from '@/components/CandidateViewer.vue'

export default {
	name: 'Browse',
	components: {
		CandidateViewer
	},
	data() {
		return {
			candidate: Object
		};
	},
	computed: {
		shared() { return this.$root.$data; },
		canRequestThisCandidate() {
			return (this.candidate.inbox.find(r => (r.sender === this.shared.me.username)) == undefined);
		},
	},
	methods: {
		reject() {
			this.shared.me.profilesRejected.push(this.candidate.username);
			this.candidate = this.nextCandidate();
		},
		request() {
			this.candidate.inbox.push({ sender: this.shared.me.username });
		},
		nextCandidate() {
			for (let thisCandidate of this.shared.profiles) {
				if (thisCandidate.username == this.shared.me.username)
					continue;
				if (this.shared.me.profilesRejected.includes(thisCandidate.username))
					continue;
				if (this.shared.me.search.type == thisCandidate.search.type)
					continue;
				if (this.shared.me.search.state != thisCandidate.search.state)
					continue;
				if (this.shared.me.search.room != thisCandidate.search.room)
					continue;
				return thisCandidate;
			}
			return undefined;
		},
		cancel() {
			let requestee = this.candidate;
			const index = requestee.inbox.find(req => req.sender === this.shared.me.username);
			requestee.inbox.splice(index, 1);
		},
		clearRejected() {
			this.shared.me.profilesRejected = [];
			this.candidate = this.nextCandidate();
		}
	},
	mounted() {
		this.candidate = this.nextCandidate();
	}
}
</script>
