<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const list = ref()
function getjson() {
  fetch('./json/sponsor.json').then((d) => d.json()).then((d) => list.value = d)
}
onMounted(() => {
  getjson()
})

</script>
<template>
  <div id="spo" class="page">
    <h1>赞助我</h1>
    <p>不是必要的，只是支持我罢了..</p>
    <p>一直没开赞助渠道:D</p>
    <div id="splist">
      <div id="sper" v-for="(value, index) in list" :key="index">
        <img :src="value.icon" alt="">
        <div id="sinfo">
          <span>{{ value.Name }}</span>
          <p>{{ value.msg }}</p>
          <p style="font-size: 0.8rem;">{{ value.value }} ￥</p>
          <a :href="'https://' + value.url">{{ value.url }}</a>
        </div>
      </div>
    </div>
    <a @click="$router.push('/sponsor')" class="bts">主播我要支持你</a>
  </div>

</template>
<style scoped>
.bts {
  margin: 2rem;
  color: #ff1e1e;
  cursor: pointer;
}

#splist {
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

#sper {

  background-color: #fff;
  width: 20rem;
  height: 8rem;
  display: flex;
  box-sizing: border-box;
  box-shadow: #000 12px 12px 2px;
}

@media (width < 528px) {
  #sper {
    width: 18rem;
    height: 7rem;
  }
}

#spo {
  display: flex;
  flex-direction: column;

  h1 {
    color: #328bf0;
    margin: 0 0 1rem 0;
    text-shadow: #328bf0e0 0 0 3px;
  }

  p {
    color: #fff;
  }
}

#sinfo {

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: start;
  padding: 0.5rem;
  box-sizing: border-box;

  span {
    font-size: 1.1rem;
  }

  p {
    color: #000;
    font-weight: 500;
    font-size: 0.9rem;
  }

  a {
    color: #ff1e1e;
  }
}
</style>
