import Vue from 'vue'
import App from './App.vue'
import router from './router'

import mock from './mock-data.js'

Vue.config.productionTip = false

let data = {
  profiles: mock.profiles,
  strings: mock.strings,
  me: undefined,
  profileWithUsername(username) {
    let result = this.profiles.find(profile => profile.username == username);
    return result;
  },
  profileName(profile) {
    let result = profile.persons.map(p => p.name).join(" and ");
    return result;
  },
  profilePriorityOf(profile, topic) {
    if (profile.priorities.dealbreakers.includes(topic))
      return -2;
    else if (profile.priorities.unimportant.includes(topic))
      return -1;
    else {
      // Must be in the 'preferred' list.
      return profile.priorities.preferred.indexOf(topic);
    }
  },
  profileOrderedTopics(profile) {
    return profile.priorities.dealbreakers.concat(profile.priorities.preferred).concat(profile.priorities.unimportant) ;
  },
  requestsFromUser(username) { // Returns an array of profiles that the given user has requested to room with.
    return this.profiles.filter(p => p.inbox.find(req => req.sender === username) != undefined);
  }
};

new Vue({
  router,
  data,
  computed: {
  },
  render: h => h(App)
}).$mount('#app')


/*
Remaining fixes.
- Profile page:  inputs only allow one character before deactivating
- Profile page:  date picker for move-in and move-out
- Browse:  first find matches that are most relevant
- Browse:  animate each incoming candidate
- Browse:  beautify the buttons; hide the footer, maybe?
*/