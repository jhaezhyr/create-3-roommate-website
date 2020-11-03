import Vue from 'vue'
import App from './App.vue'
import router from './router'

import mock from './mock-data.js'

Vue.config.productionTip = false

let data = {
  profiles: mock.profiles,
  strings: mock.strings,
  me: mock.profiles[0],
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
- Profile page:  allow you to remove all but the last person from the profile
- Profile page:  date picker for move-in and move-out
- Dashboard:  link to /browse, not browse.html
- Browse:  summary line, description line
- Browse:  first find matches that are most relevant
- Browse:  request to room button doesn't work
- Browse:  animate each incoming candidate
- Browse:  beautify the buttons; hide the footer, maybe?
- Browse:  page for if you have exhausted the options
- Dashboard:  alert for "accept" request
- All:  fix github link
- All:  generate more profiles
*/