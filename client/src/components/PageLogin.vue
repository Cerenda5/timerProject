<template>
  <div id="PageLogin" class="page">
    <h1>Connection</h1>

    <p v-if="error" class="error">{{ errorMessage }}, please try again.</p>

    <form action="#" @submit.prevent="checkUser">
      <fieldset>
      <div>
        <label class="label" for="email">Email</label>
        <input type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required="" v-model.trim="user.email">
      </div>
      <div>
        <label class="label" for="password">Password</label>
        <input type="password" name="password" required="" v-model.trim="user.password">
      </div>
      <button type="submit" @click="checkUser">Connect</button>
    </fieldset>
    </form>

    <p>Not yet registered ? <router-link to="/signin">Click here</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'PageLogin',
  data () {
    return {
      user: {
        email: "",
        password: ""
      },
      error: false,
      errorMessage: ""
    }
  },
  methods: {
    checkUser() {
      if ((this.user.email === "") || (this.user.password === "")) return;

      this.$http
        .post(`users/login`, this.user)
        .then(response => {
          this.$store.commit('login', response.data.id, response.data.token)
          this.$router.push('/').catch(()=>{})
        })
        .catch(error => {
          this.error = true
          this.errorMessage = error.response.data.message
        })
    }
  }
}
</script>

<style>

</style>
