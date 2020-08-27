<template>
  <div id="PageGroups" class="page">
    <h1>Groups list</h1>
    <button v-if="!create" @click="create = true">Create a new group</button>

    <p v-if="userNotFound" class="error">User not found, please retry.</p>
    <p v-if="errorCreate" class="error">{{ errorCreateMessage }}</p>

    <form v-if="create" action="#" @submit.prevent="createGroup">
      <fieldset>
        <div>
          <label class="label" for="name">Name</label>
          <input type="text" name="name" pattern="[A-Za-z0-9]{1,}" required="" v-model.trim="group.name">
        </div>
        <div>
          <label class="label" for="selection">Users selection (by id)</label>
          <input type="text" name="selection" pattern="[A-Za-z0-9]{1,}" @keyup="userNotFound = false; validUser = false" v-model.trim="selection">
          <button v-if="!validUser" type="button" @click="searchUser">Search</button>
          <button v-if="validUser" type="button" @click="addUser">Add</button>
        </div>
        <div v-if="group.userId.length">
          <label class="label" for="list">Users list :</label>
          <ul v-for="user in listUsers" :key="user.id">
            <li>{{ user.name }} ({{ user.id }}) <button type="button" @click="removeUser(user.index)">Remove</button></li>
          </ul>
        </div>
        <div v-else>
          <label class="label" for="list">No users yet</label>
        </div>
        <button type="submit">Create the group</button>
        <button type="button" @click="create = false">Cancel</button>
      </fieldset>
    </form>

    <p>Number of groups : {{ groups.length }}</p>{{ this.$store.state.groupToken }}
    <div v-for="group in groups" :key="group.id">
      <router-link :to="'/group/' + group._id">{{ group._id }}</router-link> - {{ group.name }} - Nb users : {{ group.users.length }} - Nb projects : {{ group.projects.length }} <button @click="deleteGroup(group._id)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageGroups',
  data () {
    return {
      selection: "",
      userNotFound: false,
      validUser: false,
      cacheUser: {
        id: "",
        name: ""
      },
      index: 0,
      listUsers: [],
      group: {
        admin: this.$store.state.userId,
        name: "",
        userId: [],
        projectId: []
      },
      groups: {},
      create: false,
      errorCreate: false,
      errorCreateMessage: ""
    }
  },
  methods: {
    searchUser() {
      if (this.selection.length < 20) return

      this.$http
        .get('users/' + this.selection)
        .then(response => {
          this.cacheUser.id = response.data.user._id
          this.cacheUser.name = response.data.user.name

          this.validUser = true
        })
        .catch(error => {
          this.userNotFound = true
          console.log(error)
        })
    },
    addUser() {
      this.group.userId.push(this.cacheUser.id)
      this.listUsers.push({index: this.index,id: this.cacheUser.id, name: this.cacheUser.name})

      this.cacheUser.id = ""
      this.cacheUser.name = ""
      this.selection = ""
      this.validUser = false
      this.index++
    },
    removeUser(index) {
      this.listUsers.splice(index, 1)
      this.index--

      this.listUsers.forEach(function(user) {
        if(user.index <= index) return
        user.index--
      });
    },
    createGroup() {
      this.$http
        .post(`groups/`, this.group, { headers: {'Authorization': `token ${this.$store.state.userToken}`} })
        .then(() => {
          this.group.name = ""
          this.group.userId = []
          this.listUsers = []

          this.create = false

          this.$router.go()
        })
        .catch(error => {
          this.errorCreate = true
          this.errorCreateMessage = error.response.error.message
        })
    },
    deleteGroup(id) {
      this.$http
        .delete('groups/' + id, { headers: {'Authorization': `token ${this.$store.state.userToken}`} })
        .then(response => {
          this.$router.go()
          console.log(response)
        })
        .catch(error => console.log(error))
    }
  },
  mounted () {
    this.$http
      .get('groups', { headers: {'Authorization': `token ${this.$store.state.userToken}`} })
      .then(response => (this.groups = response.data.groups))
      .catch(error => console.log(error))
  }
}
</script>

<style>

</style>