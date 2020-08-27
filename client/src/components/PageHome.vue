<template>
  <div id="PageHome" class="page">
    <h1>Users list</h1>
    <p>Number of users : {{ users.count }}</p>
    <div v-for="user in users.users" :key="user.id">
      <router-link :to="'/user/' + user._id">{{ user._id }}</router-link> - {{ user.name }} - {{ user.email }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHome',
  data () {
    return {
      users: ""
    }
  },
  mounted () {
    this.$http
      .get('users/')
      .then(response => (this.users = response.data))
      .catch(error => console.log(error))
  }
}
</script>

<style>

</style>
