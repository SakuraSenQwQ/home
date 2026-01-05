<script lang="ts" setup></script>
<template>
  <div id="test">
    <img v-for="value in 10" :key="value" :src="'http://localhost:9191/v1/apis/random?v=' + value" alt="">
  </div>
</template>
<style scoped>
#test {
  img {
    width: 256px;
  }
}
</style>
