<template>
    <button
        :class="['toggle-container', isOn ? 'start' : 'end']"
        @click="toggle"
    >
        <motion.div
            :data-state="isOn"
            class="toggle-handle"
            layout
            :transition="{
                type: 'spring',
                visualDuration: 0.2,
                bounce: 0.2
            }"
        />
    </button>
</template>

<script setup>
import { motion } from "motion-v"
import { ref } from "vue"

const isOn = ref(false)

const toggle = () => {
    isOn.value = !isOn.value
}
</script>

<style>
.toggle-container {
    width: 100px;
    height: 50px;
    background-color: var(--hue-3-transparent);
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    padding: 10px;
}

.toggle-container.start {
    justify-content: flex-start;
}

.toggle-container.end {
    justify-content: flex-end;
}

.toggle-handle {
    width: 50px;
    height: 50px;
    background-color: #9911ff;
    border-radius: 50%;
}
</style>
