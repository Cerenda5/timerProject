<template>
<div id="side-menu">
  <div class="profile">
    <div class="profile-picture"></div>
    <p class="profile-name"><router-link to="/user/">{{ userName }}</router-link></p>
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

#side-menu p,
#side-menu a {
  color: var(--white);
}

#side-menu .profile {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
}

#side-menu .profile .profile-picture {
  width: 100px;
  height: 100px;
  border: 5px solid var(--clear-blue);
  border-radius: 50%;
}

#side-menu .button:not(:last-child) {
  margin-bottom: 10px;
}

#side-menu .router-link-exact-active div {
  background-color: var(--clear-blue);
}
</style>