<template>
	<div class="home">
		<div class="text-page option">
			<CandidateViewer :me="shared.me" :candidate="candidate"/>
			<div class="hud-bottom-spacer"></div>
			<div class="hud-bottom">
				<button class="button" @click="reject">Next option</button>
				<button class="button" @click="request" v-if="canRequestThisCandidate">Request to room with {{shared.profileName(candidate)}}</button>
				<button class="button" @click="cancelRequest" v-else>Cancel request to room with {{shared.profileName(candidate)}}</button>
			</div>
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
			debugger
			return (this.candidate.inbox.find(r => (r.sender === this.shared.me)) == undefined);
		},
	},
	methods: {
		reject() {
			this.shared.me.profilesRejected.push(this.candidate.username);
			this.candidate = this.nextCandidate();
		},
		request() {
			this.candidate.inbox.push({ sender: this.shared.me.username });
			debugger
		},
		cancelRequest() {
			alert("That function hasn't been implemented!");
		},
		nextCandidate() {
			for (let thisCandidate of this.shared.profiles) {
				if (thisCandidate.username == this.shared.me.username)
					continue;
				if (this.shared.me.profilesRejected.includes(thisCandidate.username))
					continue;
				return thisCandidate;
			}
			return {};
		}
	},
	mounted() {
		this.candidate = this.nextCandidate();
	}
}
</script>
