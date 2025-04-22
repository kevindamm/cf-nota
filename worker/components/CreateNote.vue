<template>
  <div class="container">
    <!-- card, header slot? -->
    <h3>Note transcript</h3>
    <textarea> <!-- v-model="note" :disabled="loading || isTranscribing || state.isRecording"> -->
      {{  note  }}
    </textarea>

    <!-- card, header slot? -->
    <h3>Note recordings</h3>

    <!-- TODO tooltip? aria hint? start or stop recording -->
    <button
      :icon="micIcon"
      @click="toggleRecording">
    </button>

    <!-- TODO settings button expands to: -->
    <!--   TODO close/archive/hide button -->
    <!--   TODO delete note button, what is cf delay on archive deletion? 30 days? -->
    <!--   TODO notes autosave, but there is a publish button -->
    <!-- gestures for the above, swipe left/right, up -->
  </div>
</template>

<script setup lang="ts">
const note = ref("note text...")
const micIcon = ref("...")

function toggleRecording(event: Event) {
  alert("ON AIR")
}

// TODO autosave, client hooks into onUnload event for conditional confirmation
// TODO above component morphs from microphone button (default) to full controls
</script>

<style scoped>
</style>
