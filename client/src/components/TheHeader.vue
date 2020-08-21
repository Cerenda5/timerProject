<template>
  <div id="header">
    <router-link to="/"><img alt="Ti:mer logo" title="Ti:mer logo" src="../assets/logo_white.png"></router-link>
  </div>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style>
#header {
  max-width: 100%;
  height: 50px;
  padding: 10px 30px;
  background-color: var(--medium-blue);
}

#header img {
  height: 100%;
}
</style>