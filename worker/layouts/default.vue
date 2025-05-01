<template>
<div>
<nav>
  <h1>Mic Memo</h1>

  <ul>
    <li><NuxtLink to="/about">About</NuxtLink></li>
    <li><a href="#">Sign In/Out</a></li> <!-- TODO v-if: log out -->
    <li>TODO profile?</li>
  </ul>
</nav>

<main class="container-fluid">
  <slot />

  <div class="ui">
    <button>Take Note</button>
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
// TODO... signal handler for add-note, update-note, start-record, stop-record

// 
</script>

<style scoped>
@layer layout {

main {
  min-height: 83vh;
}

h1 {
  padding-top: .5lh;
  text-align: center;
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