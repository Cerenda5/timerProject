<template>
<div id="side-menu">
  <div v-if="this.$store.state.userId" class="profile">
    <div class="profile-picture"></div>
    <div class="profile-name">{{ userName }}</div>
  </div>
  <base-button link="/" content="Home"></base-button>
  <base-button link="/groups" content="Groups"></base-button>
  <base-button link="/projects" content="Projects"></base-button>
</div>
</template>

<script>
import BaseButton from './BaseButton.vue'

export default {
  name: 'TheSideMenu',
  components: {
    BaseButton
  },
  data() {
    return {
      userName: ""
    }
  },
  mounted() {
    if (!this.$store.state.userId) return

    this.$http
      .get('users/' + this.$store.state.userId)
      .then(response => (this.userName = response.data.user.name))
      .catch(error => { console.log(error) })
  }
}
</script>

<style>
#side-menu {
  width: 20%;
  max-width: 350px;
  max-height: 100%;
  padding: 20px 0;
  background-color: var(--dark-blue);
}

#side-menu .button:not(:last-child) {
  margin-bottom: 10px;
}

#side-menu a {
  color: var(--white);
}
</style>