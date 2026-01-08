<script lang="ts" setup>
import { onMounted, ref } from 'vue';
type blog = {
  name: string
  link: string
}
const bloglist = ref<blog[]>([])
function getlist() {
  fetch("https://blog.sakurasen.cn").then((d) => d.text()).then((d) => {
    const Dom = new DOMParser()
    const dc = Dom.parseFromString(d, "text/html")
    const card = dc.getElementsByClassName("card-base flex")
    for (let i = 1; i < 7; i++) {
      const a = card[i]?.children[1] as HTMLLinkElement
      bloglist.value.push({ name: a.ariaLabel!, link: a.getAttribute('href')! })
    }
  })
}
onMounted(() => {
  getlist()
})
</script>
<template>
  <div class="page blogs">
    <h1>我的文章</h1>
    <div class="view">
      <div class="links" :title="v.name" v-for="(v, i) in bloglist" :key="i">
        <a :href="'https://blog.sakurasen.cn' + v.link" target="_blank">{{ v.name }}</a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.view {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  overflow: hidden;
  justify-content: center;

}

.links {

  max-width: 10rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background-color: #ececec;
  border-radius: 12px;

  a {
    text-decoration: none;
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 0.5rem;
    text-align: start;
    font-size: 1.2rem;

  }
}

.blogs {
  padding: 0.4rem;
  width: 60%;
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (width < 584px) {
  .blogs {
    width: 100%;
  }
}
</style>
