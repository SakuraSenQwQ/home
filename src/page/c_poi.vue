<script setup lang="ts">
import { ref } from 'vue';
const x = ref(0)
const y = ref(0)
addEventListener('mousemove', (e) => {
  x.value = e.clientX
  y.value = e.clientY
  document.getElementById("ys")!.style.left = String(x.value) + "px"
  document.getElementById("ys")!.style.top = String(y.value) + "px"
  console.log(x.value, y.value)
})
</script>
<template>
  <img id="ys" class="po" src="/imgs/ysnb.jpg" alt="">
</template>
<style scoped>
.po {
  pointer-events: none;
  width: 256px;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
