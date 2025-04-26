<template>
<div>
<NavigationMenu />

<main class="container-fluid">
  <slot />

  <div class="ui">
    <motion.button
      initial="{opacity: 0}"
      animate="{opacity: 1}"
    >
    Take Note
  </motion.button>
  </div>
  <!-- TODO layout of main page
    button [mic.svg]: start memo
    (if exists): today's memo card (audio, text, publish, inspect)
    (if fetched/scrolled-to): history of memos (saved/published)
  -->
</main>

<footer class="container">
  <div>Copyright &copy; 2025 Kevin Damm</div>
  <!-- TODO link terms of service, source code repo,  -->
</footer>

</div>
</template>


<script setup lang="ts">
import { motion } from 'motion-v';
// TODO... signal handler for add-note, update-note, start-record, stop-record
// TODO? analytics
</script>

<style scoped>
@layer layout {

main {
  min-height: 83vh;
}

.ui > button {
  margin: 0 auto;
  display: block;
}

footer.container {
  bottom: 0;
  text-align: center;
  padding-bottom: 1lh;
  margin: auto;
}

}
</style>