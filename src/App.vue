<script lang="ts" setup>
import c_Music from './page/c_Music.vue';
const rand = Math.floor(Math.random() * 5)
if (window.location.pathname == '/icon'){
  window.location.pathname = '/imgs/avat.png'
}
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Component :is="Component" :random="rand" />
  </RouterView>
  <div id="component">
    <c_Music :random="rand" />
  </div>
</template>
