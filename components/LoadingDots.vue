<template>
  <motion.div
    class="container"
    animate="jump"
    :transition="{ staggerChildren: -0.2, staggerDirection: -1 }"
  >
    <motion.div class="dot" :variants="dotVariants" />
    <motion.div class="dot" :variants="dotVariants" />
    <motion.div class="dot" :variants="dotVariants" />
  </motion.div>
</template>

<script setup>
import { motion } from "motion-v"

const dotVariants = {
  jump: {
    y: -30,
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--wave-indigo);
  will-change: transform;
}
</style>