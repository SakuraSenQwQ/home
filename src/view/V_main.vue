<script lang="ts" setup>
import P_Frineds from '@/page/p_Frineds.vue';
import P_Home from '@/page/p_Home.vue';
import P_Whoami from '@/page/p_Whoami.vue';
import p_Projects from '@/page/p_Projects.vue';
import p_Beian from '@/page/p_Beian.vue';

import P_Sponsor from '@/page/p_Sponsor.vue';
const prop = defineProps({
  random: {
    type: Number,
    required: true,
  }
})
</script>
<template>
  <div id="main">
    <P_Home :random="prop.random" />
    <P_Whoami />
    <P_Frineds />
    <p_Projects />
    <P_Sponsor></P_Sponsor>
    <p_Beian />
  </div>
</template>
<style scoped>
#mouse {
  overflow: hidden;
  z-index: 9999;
  display: none;
  position: fixed;
  width: 10px;
  height: 10px;
  filter: blur(1px);
  border-radius: 100%;
  box-shadow: #fff 0 0 2px;
  background-color: #fff;
}

#main {
  padding: 2rem;
  background-color: #030303;
  display: block;
  height: auto;
}
</style>
