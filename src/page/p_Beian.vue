<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const damo = window.location.hostname
const icp = ref("你不应该看到这段文字，如果看到，请联系我")
const gongan = ref("你不应该看到这段文字，如果看到，请联系我")
const ga = ref("")
function beianinfo() {
  switch (damo) {
    case "localhost":
      icp.value = "豫ICP备2024071946号"
      gongan.value = "豫公网安备41040302000150号"
      ga.value = "https://beian.mps.gov.cn/#/query/webSearch?code=41040302000150"
      break;
    case "localhost":
      icp.value = "localhost有个毛备案"
      gongan.value = "哈哈，那无敌了"
      ga.value = "https://yuanshen.com"
      break;
    default:
      icp.value = "您所访问的域名并不在备案列表内"
      gongan.value = "您所访问的域名并不在备案列表内"
      break;
  }
}

onMounted(() => {
  beianinfo()
})
</script>
<template>
  <div id="beian" class="page">
    <p>{{ damo }}</p>
    <p><a href="https://beian.miit.gov.cn/" target="_blank">{{ icp }}</a></p>
    <p><a :href="ga" target="_blank">{{ gongan }}</a></p>
  </div>
</template>
<style scoped>
#beian {
  padding: 0;

  p {
    color: #fff;
  }

  a {
    color: #fff;
    text-decoration: none;
  }
}
</style>
