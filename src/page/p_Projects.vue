<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const pjlist = ref()
let mousex: number
let mousey: number
document.addEventListener("mousemove", (e) => {
  mousex = e.pageX
  mousey = e.pageY
})
onMounted(() => {
  getlist()
})
const dragstart = ref(false)
const dragorx = ref(0)
const dragory = ref(0)
const mx = ref(0)
const my = ref(0)
function getdrag(id: string) {
  if (!dragstart.value) {
    return
  }
  const pj = document.getElementById(id)
  const x = mousex - dragorx.value + mx.value
  const y = mousey - dragory.value + my.value
  pj?.style.setProperty('--x', `${x}`)
  pj?.style.setProperty('--y', `${y}`)
}
const bindid = ref("")
document.addEventListener("mousemove", () => {
  if (dragstart.value) {
    getdrag(bindid.value)
  }
})

function getlist() {
  fetch("./json/projects.json")
    .then((d) => d.json())
    .then((d) => {
      pjlist.value = d
    })
}

function startdrag(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const style = el.style
  const rawx = parseFloat(style.getPropertyValue('--x')) || 0
  const rawy = parseFloat(style.getPropertyValue('--y')) || 0
  mx.value = rawx
  my.value = rawy
  if (dragstart.value) {
    dragstart.value = false
    dragorx.value = mousex
    dragory.value = mousey
    return
  }
  bindid.value = el.id
  dragstart.value = true
  dragorx.value = mousex
  dragory.value = mousey

}
</script>
<template>
  <div id="projects" class="page">
    <h1>我的项目</h1>
    <p>为什么会有这一栏呢..</p>
    <div id="pjs">
      <div class="pj" v-for="(val, index) in pjlist" :key="index" :id="'pj' + index"
        :style="{ 'transform': 'translate3d(calc(var(--x) * 1px), calc(var(--y) * 1px), 0)' }"
        @mousedown="startdrag($event)" @mouseup="startdrag($event)" draggable="false">
        <div id="tit">
          <h2>{{ val.name }}</h2>
        </div>
        <p>{{ val.desc }}</p>
        <div class="bts">
          <span v-if="val.github !== ''">
            <a class="link" :href="val.github" target="_blank">Github</a>
          </span>
          <span v-if="val.web !== ''">
            <a class="link" :href="val.web" draggable="false" target="_blank">项目链接</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.link {
  color: #000000;
  text-decoration: none;

  * {
    user-select: none;
  }
}

.bts {
  * {
    user-select: none;
  }

  display: flex;
  gap: 1rem;
  margin-top: auto;
  justify-content: center;
  box-sizing: border-box;
  padding: 0.5rem;
}

#pjs {
  margin: 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;

  * {
    user-select: none;
  }

  .pj {
    cursor: grab;
    border-radius: 12px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: start;
    justify-content: start;
    width: 15rem;
    height: 10rem;
    border: #ffffff solid 3px;
    box-shadow: #000000 5px 5px 0px;
    background-color: #000000;

    p {
      color: #ffffff;
      margin: 0.3rem;
    }

    span {
      padding: 0.2rem;
      box-sizing: border-box;
      font-size: 0.9rem;
      font-weight: bold;
      background-color: #fff;
      color: #000000;
    }

    #tit {

      display: flex;
      align-items: center;
      box-sizing: border-box;
      font-size: 1.2rem;
      width: 100%;
      border-radius: 12px 12px 0 0;

      padding: 0.2rem;

      h2 {
        color: #ffffff;
      }

      span {
        color: #ffffff;
        justify-self: end;
        align-self: flex-end;
      }
    }
  }
}

#projects {
  h1 {
    color: #328bf0;
    margin: 0 0 1rem 0;
    text-shadow: #328bf0e0 0 0 3px;
  }

  p {
    color: #fff;
  }
}
</style>
