<template>
  <div id="PageUser" class="page">
    <h1>{{ user.name }}</h1>

    <div v-if="!modify && !error">
      {{ user._id }} - {{ user.name }} - {{ user.email }}
    </div>
    <form v-if="modify" action="#" @submit.prevent="validModify">
      <fieldset>
      <div>
        <label class="label" for="name">Name</label>
        <input type="text" name="name" pattern="[A-Za-z0-9]{1,}" required="" v-model="user.name">
      </div>
      <div>
        <label class="label" for="email">Email</label>
        <input type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required="" v-model="user.email">
      </div>
      <button type="submit" @click="validModify">Valid</button>
      <button @click="modify = false">Cancel</button>
    </fieldset>
    </form>
    <div v-if="!modify && !error">
      <button @click="modifyUser">Modify</button>
      <button @click="deleteUser">Delete</button>
    </div>
  </div>
</template>

<script>
/*import bcrypt from "bcryptjs"*/

export default {
  name: 'PageHome',
  data () {
    return {
      user: {},
      error: null,
      modify: false
    }
  },
  methods: {
    modifyUser() {
      this.modify = true
    },
    validModify() {
      /*this.$http
        .put(`users/${this.$store.state.userId}`, this.user)
        .catch(error => console.log(error))

        this.modify = false*/
        alert("You can't do that for the moment")
    },
    deleteUser() {
      this.$http
        .delete(`users/${this.$store.state.userId}`)
        .then(response => console.log(response))
        .catch(error => console.log(error))

      this.$router.push('/').catch(()=>{})
    },
    checkPassword() {

    }
  },
  mounted () {
    this.$http
      .get('users/' + this.$store.state.userId)
      .then(response => {
        this.user = response.data.user
        this.user.password = 3
      })
      .catch(error => {
        this.error = true
        console.log(error)
      })
  }
}
</script>

<style>

</style>