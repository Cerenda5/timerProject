<template>
  <div id="PageProjectDetails" class="page">

    <div v-if="error">
      <p>L'utilisateur recherché n'existe pas. Veuillez séléctionner un utilisateur existant.</p>
      <router-link to="/">Retour</router-link>
    </div>

    <h1>{{ user.firstName }} {{ user.lastName.toUpperCase() }}</h1>
    <div v-if="!modify && !error">
      {{ user.id }} - {{ user.firstName }} - {{ user.lastName }} - {{ user.email }} - {{ user.phoneNumber }} - {{ user.tag }}
    </div>
    <form v-if="modify">
      <fieldset>
      <div>
        <label class="label" for="firstName">Prénom</label>
        <input type="text" name="firstName" pattern="[A-Za-z]{1,}" required="" v-model="user.firstName">
      </div>
      <div>
        <label class="label" for="lastName">Nom</label>
        <input type="text" name="lastName" pattern="[A-Za-z]{1,}" required="" v-model="user.lastName">
      </div>
      <div>
        <label class="label" for="email">Email</label>
        <input type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" required="" v-model="user.email">
      </div>
      <div>
        <label class="label" for="phoneNumber">Numéro de téléphone</label>
        <input type="number" name="phoneNumber" min="0" maxlength="10" required="" v-model="user.phoneNumber">
      </div>
      <div>
        <label class="label" for="tag">Tag</label>
        <input type="text" name="tag" pattern="[a-z]{1,}" required="" v-model="user.tag">
      </div>
    </fieldset>
    </form>
    <div v-if="!modify && !error">
      <button @click="modifyUser">Modifier l'utilisateur</button>
      <button @click="deleteUser">Supprimer l'utilisateur</button>
    </div>
    <div v-if="modify">
      <button @click="validModify">Valider</button>
      <button @click="modify = false">Annuler</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageProjectDetails',
  data () {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        tag: ""
      },
      error: false,
      modify: false
    }
  },
  methods: {
    modifyUser() {
      this.modify = true
    },
    validModify() {
      this.$http
        .put(`users/${this.$route.params.id}`, this.user)
        .catch(error => console.log(error))

        this.modify = false
    },
    deleteUser() {
      this.$http
        .delete(`users/${this.$route.params.id}`)
        .then(response => console.log(response))
        .catch(error => console.log(error))

      window.location.href = '/'
    }
  },
  mounted () {
    this.$http
      .get('users/' + this.$route.params.id)
      .then(response => (this.user = response.data))
      .catch(error => {
        this.error = true
        console.log(error)
      })
  }
}
</script>

<style>

</style>