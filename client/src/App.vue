<template>
  <div id="app">
    <the-header></the-header>
    <div id="content">
      <the-side-menu v-if="this.$store.state.userId"></the-side-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheSideMenu from './components/TheSideMenu.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheSideMenu
  }
}
</script>

<style>
:root {
  --dark-blue: #004C59;
  --medium-blue: #00728C;
  --clear-blue: #49B0C1;
  --dark-grey: #E6E6E6;
  --clear-grey: #F2F2F2;
  --white: #FFF;
  --black: #000;
}

body {
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
}

#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}

#content {
  display: flex;
  height: calc(100% - 70px);
}

.page {
  padding: 20px;
}

.error {
  color: var(--white);
  background-color: #FF534C;
  padding: 20px;
  border-radius: 7px;
}
</style>