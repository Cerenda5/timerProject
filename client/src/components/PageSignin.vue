<template>
  <div id="PageSignin" class="page">
    <h1>Welcome</h1>

    <p><i>Password must contain at least one number, one uppercase, lowercase letter, and at least 8 or more characters</i></p>

    <p v-if="error" class="error">{{ errorMessage }}, please try again.</p>

    <form action="#" @submit.prevent="createUser">
    <fieldset>
      <div>
        <label class="label" for="name">Name</label>
        <input type="text" name="name" pattern="[A-Za-z0-9]{1,}" required="" v-model.trim="user.name">
      </div>
      <div>
        <label class="label" for="email">Email</label>
        <input type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required="" v-model.trim="user.email">
      </div>
      <div>
        <label class="label" for="password">password</label>
        <input type="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required="" v-model.trim="user.password">
      </div>

      <button type="submit" @click="createUser">Create my account</button>
    </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PageSignin',
  data () {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      },
      error: false,
      errorMessage: ""
    }
  },
  methods: {
    createUser() {
      if ((this.user.name === "") || (this.user.email === "") || (this.user.password === "") || (this.user.password.length < 8)) return;

      this.$http
        .post(`users/signup`, this.user)
        .then(() => {
          this.$http
            .post(`users/login`, {email: this.user.email, password: this.user.password})
            .then(response => {
              this.$store.commit('login', response.data.id, response.data.token)
              this.$router.push('/').catch(()=>{})
            })
            .catch(error => {
              this.error = true
              this.errorMessage = error.response.error.message
            })
        })
        .catch(error => {
          this.error = true
          this.errorMessage = error.response.error.message
        })
    }
  }
}
</script>

<style>

</style>