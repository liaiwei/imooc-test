<template>
  <div @click='onToggle'>
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    />
  </div>
</template>

<script setup>
import {ref,onMounted,onUnmounted} from 'vue'
import screenfull from 'screenfull'

const isFullscreen = ref(false)
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
onMounted(()=>{
  screenfull.on('change', change)
})

onUnmounted(()=>{
  screenfull.off('change', change)
})
const onToggle = () =>{
  screenfull.toggle()
}
</script>
