<!-- custom error page -->

<template>
  <div class="center-items">
    <h1>{{ error?.statusCode || "500 ERROR" }}</h1>
    <NuxtLink to="/">Return home</NuxtLink>
  </div>
</template>

<!--
The error object provides the following fields:

{
  statusCode: number
  fatal: boolean
  unhandled: boolean
  statusMessage?: string
  data?: unknown
  cause?: unknown
}
custom fields should be added to data, fields other than the above will be lost.
-->

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<style scoped>
.center-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  grid-auto-rows: 200px;
  grid-template-areas:
    ". . . ."
    ". a a ."
    ". b b .";
}

.center-items > h1 {
  grid-area: a;
  align-self: end;
  justify-self: center;
}

.center-items > a {
  grid-area: b;
  align-self: center;
  justify-self: center;
}

</style>
