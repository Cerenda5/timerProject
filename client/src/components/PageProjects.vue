<template>
  <div id="PageProjects" class="page">
    <h1>Liste des utilisateurs</h1>
    <p>Nombre d'utilisateurs : {{ users.length }}</p>
    <div v-for="user in users" :key="user.id">
      <router-link :to="'/user/' + user.id">{{ user.id }}</router-link> - {{ user.firstName }} - {{ user.lastName }} - {{ user.email }} - {{ user.phoneNumber }} - {{ user.tag }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageProjects',
  data () {
    return {
      users: ""
    }
  },
  mounted () {
    this.$http
      .get('users')
      .then(response => (this.users = response.data))
      .catch(error => console.log(error))
  }
}
</script>

<style>

</style>
