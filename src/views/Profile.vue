<template>
	<div class="home">
		<div class="text-page">
			<h2>Profile</h2>
			<h3>Basics<span> ({{shared.me.persons.length}} person(s))</span></h3>
			<div class="box-options" v-for="person in shared.me.persons" :key="person.name">
				<p>Name<input v-model="person.name" placeholder="Gotta name, pardner?"/></p>
				<p>Gender
					<select v-model="person.gender">
						<option> </option>
						<option>male</option>
						<option>female</option>
					</select>
				</p>
			</div>
			<button @click.prevent="addPerson"><span class="button-circle">+</span>Add a person to profile</button>

			<h3>Priorities</h3>
			<div class="box-options">
				<p>Rate the importance of having a roommate with matching qualities. Drag to recategorize and reorder.</p>
				<div v-for="category in topicCategories" :key="category">
					<h5>{{shared.strings.categories[category]}}</h5>
					<ul class="priorities">
						<li v-for="topic in shared.me.priorities[category]" draggable="true" @dragstart="dragItem(topic, category)" @drop="dropItem(topic, category)" :key="topic" v-on:dragover.prevent>{{shared.strings.priorities[topic]}}</li>
						<li v-if="shared.me.priorities[category].length===0" @drop="dropFirstItem(category)" v-on:dragover.prevent><i>No items</i></li>
					</ul>
				</div>
			</div>

			<div v-for="topic in shared.profileOrderedTopics(shared.me)" :key="topic">
				<h3>{{shared.strings.priorities[topic]}}</h3>
				<div class="box-options">
					<input type="radio" :id="topic+'0'" :value="0" :name="topic" v-model="shared.me.preferences[topic]"/>
					<label :for="topic+'0'">{{shared.strings.preferences[topic][0]}}</label>
					<br>
					<input type="radio" :id="topic+'1'" :value="1" :name="topic" v-model="shared.me.preferences[topic]"/>
					<label :for="topic+'1'">{{shared.strings.preferences[topic][1]}}</label>
					<br>
					<input type="radio" :id="topic+'2'" :value="2" :name="topic" v-model="shared.me.preferences[topic]"/>
					<label :for="topic+'2'">{{shared.strings.preferences[topic][2]}}</label>
				</div>
			</div>
	
			<h3>Housing</h3>
			<div class="box-options">
				<input type="radio" id="i-have-house" name="house" value="post" v-model="shared.me.search.type"/>
				<label for="i-have-house">I have a space. I need a roommate.</label>
				<br>
				<input type="radio" id="i-want-house" name="house" value="find" v-model="shared.me.search.type"/>
				<label for="i-want-house">I need a space and a roommate.</label>
				<div v-if="shared.me.search.type==='post'">
					<p>Address: <input v-model="shared.me.search.zone.address"/></p>
					<p>City: <input v-model="shared.me.search.zone.city"/></p>
					<p>State: <input v-model="shared.me.search.zone.state"/></p>
					<p>Zip code: <input v-model="shared.me.search.zone.zipCode"/></p>
					<p>Move-in date: <input v-model="shared.me.search.moveInDate"></p>
					<p>Move-out date: <input v-model="shared.me.search.moveOutDate"></p>
					<p>Costs $<input v-model="shared.me.search.payment"> per month.</p>
					<p>It's a <select v-model="shared.me.search.room">
						<option value=""> </option>
						<option value="shared">shared</option>
						<option value="private">private</option>
					</select> room.</p>
				</div>
				<div v-if="shared.me.search.type==='find'">
					<p>Zip code: <input v-model="shared.me.search.zone.zipCode"/></p>
					<p>Move-in date: <input v-model="shared.me.search.moveInDate"></p>
					<p>Move-out date: <input v-model="shared.me.search.moveOutDate"></p>
					<p>I can pay from $<input v-model="shared.me.search.paymentMin"> to $<input v-model="shared.me.search.paymentMax">.</p>
					<p>I want a <select v-model="shared.me.search.room">
						<option value=""> </option>
						<option value="shared">shared</option>
						<option value="private">private</option>
					</select> room.</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Profile',
	components: {
	},
	data() {
		return {
			drag: {
				topic: '',
				srcCategory: ''
			}
		}
	},
	computed: {
		shared() {
			return this.$root.$data;
		},
		topicCategories() {
			return ['dealbreakers', 'preferred', 'unimportant'];
		}
	},
	methods: {
		addPerson() {
			this.shared.me.persons.push({ name: "", gender: " " });
		},
		dragItem(topic, srcCategory) {
			this.drag = {
				topic,
				srcCategory
			};
		},
		dropItem(landingTopic, dstCategory) {
			const indexItem = this.shared.me.priorities[this.drag.srcCategory].indexOf(this.drag.topic);
			const indexTarget = this.shared.me.priorities[dstCategory].indexOf(landingTopic);
			this.shared.me.priorities[this.drag.srcCategory].splice(indexItem, 1);
			this.shared.me.priorities[dstCategory].splice(indexTarget, 0, this.drag.topic);
		},
		dropFirstItem(dstCategory) {
			const indexItem = this.shared.me.priorities[this.drag.srcCategory].indexOf(this.drag.topic);
			this.shared.me.priorities[this.drag.srcCategory].splice(indexItem, 1);
			this.shared.me.priorities[dstCategory] = [this.drag.topic];
		}
	}
}
</script>
