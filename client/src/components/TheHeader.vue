<template>
  <div id="header">
    <router-link to="/">Home</router-link>
    <router-link to="/new-user">New user</router-link>
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

#header a:not(:last-child) {
  margin-right: 10px;
}
</style>