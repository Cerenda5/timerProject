<template>
  <div id="PageNewUser" class="page">
    <h1>Ajout d'un nouvel utilisateur</h1>

    <form @submit="submitForm">
    <fieldset>
      <div>
        <label class="label" for="firstName">Prénom</label>
        <input type="text" name="firstName" pattern="[A-Za-z]{1,}" required="" v-model="firstName">
      </div>
      <div>
        <label class="label" for="lastName">Nom</label>
        <input type="text" name="lastName" pattern="[A-Za-z]{1,}" required="" v-model="lastName">
      </div>
      <div>
        <label class="label" for="email">Email</label>
        <input type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" required="" v-model="email">
      </div>
      <div>
        <label class="label" for="phoneNumber">Numéro de téléphone</label>
        <input type="number" name="phoneNumber" min="0" maxlength="10" required="" v-model="phoneNumber">
      </div>
      <div>
        <label class="label" for="tag">Tag</label>
        <input type="text" name="tag" pattern="[a-z]{1,}" required="" v-model="tag">
      </div>

      <input type="submit" value="Valider">
    </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PageNewUser',
  data () {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      tag: ""
    }
  },
  methods: {
    submitForm() {
      event.preventDefault();

      const req = {
        "firstName": this.firstName,
        "lastName": this.lastName,
        "email": this.email,
        "phoneNumber": this.phoneNumber,
        "tag": this.tag
      }

      this.$http
        .post('users/', req)
        .then(response => console.log(response))
        .catch(error => console.log(error))

      window.location.href = '/';
    }
  }
}
</script>

<style>

</style>