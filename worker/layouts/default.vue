<template>
<h1>Mic Memo</h1> <!-- hide in some layouts? -->

<main class="container-fluid">
  <slot />
</main>

<footer class="container">
  <div>Copyright &copy; 2025 Kevin Damm, all rights reserved.</div>
  <!-- TODO link terms of service, source code repo,  -->
</footer>
</template>

<script setup lang="ts">
// TODO... signal handler for add-note, update-note, start-record, stop-record
</script>

<style scoped>
@layer layout {

h1 {
  padding-top: .5lh;
  text-align: center;
}

footer.container {
  bottom: 0;
  text-align: center;
  padding-bottom: 1lh;
  margin: auto;
}

}
</style>