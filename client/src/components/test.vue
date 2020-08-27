<template>
<div class="page test">
  <div>
    <p>Ton item : {{ message }}</p>
    <input v-model="message" @keyup.enter="addItem" placeholder="écrit ici" autofocus>
    <button v-if="message.length > 0" @click="addItem">Ajouter</button>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.id }} - {{ item.text }} <button @click="deleteItem(item.id)">Supprimer</button>
      </li>
    </ul>
    <p v-if="!items.length">Tu as tout fini !</p>
  </div>
  <button @click="count++">Tu as cliqué {{ count }} fois</button>
</div>
</template>

<script>
  export default {
    name: 'test',
    data: function() {
      return {
        message: "",
        count: 0,
        items: [
          { id: 1, text: 'Apprendre JavaScript' },
          { id: 2, text: 'Apprendre Vue' },
          { id: 3, text: 'Créer quelque chose de génial' }
        ],
        nextItemId: 4
      }
    },
    methods: {
      addItem: function() {
        if (!this.message.length) return
        this.items.push({
          id: this.nextItemId,
          text: this.message
        })
        this.nextItemId++

        this.message = ""
      },
      deleteItem: function(id) {
        this.items.splice(id - 1, 1)
        this.nextItemId--

        this.items.forEach(function(item) {
          if(item.id <= id) return
          item.id--
        });
      }
    }
  }
</script>

<style>
  /* Your CSS goes here */
</style>