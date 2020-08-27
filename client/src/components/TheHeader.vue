<template>
  <div id="header">
    <router-link to="/"><img alt="Ti:mer logo" title="Ti:mer logo" src="../assets/logo_white.png"></router-link>
    <div v-if="this.$store.state.userId" @click="logout" class="log">Logout</div>
    <router-link v-else to="/login" class="log">Login</router-link>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  methods: {
    logout() {
      this.$store.commit('logout')
      this.$router.push('/login').catch(()=>{})
    }
  }
}
</script>

<style>
#header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  height: 50px;
  padding: 10px 30px;
  background-color: var(--medium-blue);
}

#header a {
  height: inherit;
}

#header img {
  height: 100%;
}

#header .log {
  height: min-content;
  color: var(--white);
  cursor: pointer;
}
</style>