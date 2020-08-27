<template>
  <div id="PageGroups" class="page">
    <h1>Groups list</h1>
    <p>Number of groups : {{ users.length }}</p>
    <div v-for="user in users" :key="user.id">
      <router-link :to="'/user/' + user.id">{{ user.id }}</router-link> - {{ user.firstName }} - {{ user.lastName }} - {{ user.email }} - {{ user.phoneNumber }} - {{ user.tag }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageGroups',
  data () {
    return {
      users: ""
    }
  },
  mounted () {
    this.$http
      .get('groups', { headers: {'Authorization': this.$store.state.userToken} })
      .then(response => (this.users = response.data))
      .catch(error => console.log(error))
  }
}
</script>

<style>

</style>
