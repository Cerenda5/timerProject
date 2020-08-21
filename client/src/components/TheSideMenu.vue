<template>
<div id="side-menu">
  <base-button link="/test" content="Home"></base-button>
  <base-button link="/teams" content="Teams"></base-button>
  <base-button link="/projects" content="Projects"></base-button>
</div>
</template>

<script>
import BaseButton from './BaseButton.vue'

export default {
  name: 'TheSideMenu',
  components: {
    BaseButton
  }
}
</script>

<style>
#side-menu {
  width: 20%;
  max-width: 350px;
  max-height: 100%;
  padding: 20px 0;
  background-color: var(--dark-blue);
}

#side-menu .button:not(:last-child) {
  margin-bottom: 10px;
}

a {
  color: var(--white);
}
</style>