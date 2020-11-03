<template>
	<div class="home">
		<div class="text-page option">
			<div v-for="person in candidate.persons" :key="person.name">
				<div class="horizontal">
					<p class="aux-info">{{shared.strings.genders[person.gender]}}</p>
					<h1>{{person.name}}</h1>
				</div>
				<p>{{person.description}}</p>
			</div>
			<h3>{{comparison.myVerdict.simple}}<p> ({{comparison.myVerdict.matchPercent}}% match)</p></h3>
			<p>{{comparison.myVerdict.rationale}}</p>
			<ul class="priorities">
				<li v-for="pref in comparison.myVerdict.preferences" :key="pref.key">
					<Rating :value="pref.value" :max="pref.max" />
					{{pref.string}}
					<p class="priority" v-show="pref.tag!=''">{{pref.tag}}</p>
				</li>
			</ul>
			<h3>{{comparison.hisVerdict.simple}}<p> ({{comparison.hisVerdict.matchPercent}}% match)</p></h3>
			<p>{{comparison.hisVerdict.rationale}}</p>
			<ul class="priorities">
				<li v-for="pref in comparison.hisVerdict.preferences" :key="pref.key">
					<Rating :value="pref.value" :max="pref.max" />
					{{pref.string}}
					<p class="priority" v-show="pref.tag!=''">{{pref.tag}}</p>
				</li>
			</ul>
			<hr>
			<h3>{{shared.strings.roomSearch[candidate.search.room]}} room - Heritage Halls</h3>
			<iframe class="map" :src="candidate.search.googleMaps" width="250" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
			<p>{{moment(candidate.search.moveInDate).format("MMM D, YYYY")}} - {{moment(candidate.search.moveOutDate).format("MMM D, YYYY")}}</p>
			<p>${{candidate.search.payment}} per month</p>
			<p>{{candidate.search.location.address}}<br/>{{candidate.search.location.city}}, {{candidate.search.location.state}} {{candidate.search.location.zipCode}}</p>
			<p>{{Object.values(candidate.search.details).join(" ")}}</p>
		</div>
	</div>
</template>

<script>
import Rating from "@/components/Rating.vue"

export default {
	name: 'CandidateViewer',
	components: {
		Rating
	},
	props: {
		candidate: Object
	},
	computed: {
		shared() { return this.$root.$data; },
		comparison() {
			return {
				myVerdict: this.verdictBetween(this.shared.me, this.candidate),
				hisVerdict: this.verdictBetween(this.candidate, this.shared.me),
			};
		}
	},
	methods: {
		verdictBetween(self, other) {
			const myPriorityN = self.priorities.preferred.length;

			// A priority number is either -1 (unimportant), 0...n-1 (priority index), or -2 (dealbreaker).
			// A pref number is 0 (lo), 1 (med), or 2 (hi).
			// Returns a { value: Number, max: Number } object.
			function scoreMe(myPriorityX, myPref, hisPref) {
				// Let's just make it index into a 4D array.
				// Priority indices are 0-dealbreaker, 1-hi, 2-med, 3-lo, 4-unimportant
				const myPriorityIndex =
					myPriorityX===-2 ? 0
					: myPriorityX===-1 ? 4
					: 1 + Math.floor(3*myPriorityX / myPriorityN);

				// Use
				let maxTable = [3,3,2,1,0]
				let valueTable =
					[[[3,2,-1],[1,3,1],[-1,2,3]],
					[[3,2,0],[1,3,1],[0,2,3]],
					[[2,1,0],[1,2,1],[0,1,2]],
					[[1,0,0],[0,1,0],[0,0,1]],
					[[0,0,0],[0,0,0],[0,0,0]]];

				return { value: valueTable[myPriorityIndex][myPref][hisPref], max: maxTable[myPriorityIndex] };
			}

			let dealbreaker = false;
			let maxScore = 0;
			let score = 0;
			let preferences = [];
			for (const topic of this.shared.profileOrderedTopics(self)) { // self.preferences happens to have all topics in the right order.
				const myPriorityX = this.shared.profilePriorityOf(self, topic);
				const thisScore = scoreMe(
					myPriorityX,
					self.preferences[topic],
					other.preferences[topic]
				);
				maxScore += thisScore.max;
				score += thisScore.value;
				if (score === -1)
					dealbreaker = true;
				preferences.push({
					max: thisScore.max,
					value: thisScore.value,
					string: this.shared.strings.preferences[topic][other.preferences[topic]],
					tag: myPriorityX===-2 ? '!' : myPriorityX===-1 ? '-' : '', // or is this myPriorityX?
					key: topic,
				});
			}

			return {
				simple: "No deal!",
				matchPercent: dealbreaker ? 0 : Math.round(score*100 / maxScore),
				rationale: "His policy on pets is simply unacceptable for you.",
				preferences
			};
		}
	}
}
</script>
