<template>
  <div id="app">
    <the-header></the-header>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'

export default {
  name: 'App',
  components: {
    TheHeader
  }
}
</script>

<style>
:root {
  --medium-blue: #00728C;
  --white: #FFF;
  --black: #000;
}

body {
  padding: 0;
  margin: 0;
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
</style>
