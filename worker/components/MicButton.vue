<template>
<svg>
  <!--TODO template for mic icon-->
  <!--TODO template for animated -->
  <!--use tag -- reused? or reinserted? or class=hidden -->
</svg>
</template>

<script setup lang="ts">
import { useMediaRecorder } from '../../composables/useMediaRecorder';

const { state,
  startRecording: start, 
  stopRecording: stop
} = useMediaRecorder();

const clickMic = () => {
  // ...
  start();
};

const clickDone = () => {
  // ...
  stop();
}
</script>
