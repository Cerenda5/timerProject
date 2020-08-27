<template>
  <div id="PageHome" class="page">
    <h1>Liste des utilisateurs</h1>
    <p>is connect : <span v-if="this.$store.state.userId">yes</span><span v-else>no</span></p>
    <p v-if="this.$store.state.userId ">userid : {{ this.$store.state.userId }}</p> - {{ this.$store.state.userToken }}
    <p>Nombre d'utilisateurs : {{ users.count }}</p>
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
