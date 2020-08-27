<template>
  <div class="button">
    <router-link v-if="link" :to="link"><div>{{ content }}</div></router-link>
    <div v-if="func" @click="func">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    content: String,
    link: {
      type: String,
      required: false
    },
    func: {
      type: Function,
      required: false
    }
  }
}
</script>

<style>
.button div {
  text-align: center;
  padding: 20px;
  background-color: var(--medium-blue);
}

.button > div {
  background-color: var(--clear-blue);
  cursor: pointer;
}

.button * {
  color: var(--white);
  text-decoration: none;
}
</style>