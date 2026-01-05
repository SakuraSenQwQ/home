<script lang="ts" setup>
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { onMounted } from 'vue';
gsap.registerPlugin(ScrollToPlugin)
addEventListener("DOMContentLoaded", () => {
  const avat = document.getElementById("ava")
  avat?.addEventListener("load", () => {
    gsap.to("#ava", { opacity: 1, duration: 0.5 })
    gsap.to("#avat", { backgroundColor: '#7bff76', duration: 1, delay: 0.5, opacity: 1, boxShadow: '#7bff76 0px 0px 10px 0px' })
  })
  const tl = gsap.timeline()
  tl.to("#person", { left: 0 })
  const t2 = gsap.timeline()
  t2.repeat(-1)
  t2.yoyo(true)
  t2.to("#more3", { opacity: 0, duration: 0.3 })
    .to("#more2", { opacity: 0, duration: 0.3 })
})
function goto() {

  gsap.to(window, {
    scrollTo: "#info",
    duration: 0.5,
    ease: "power2.out"

  })
}
onMounted(() => {
  const avat = document.getElementById("ava")
  avat?.addEventListener("load", () => {
    gsap.to("#ava", { opacity: 1, duration: 0.5 })
    gsap.to("#avat", { backgroundColor: '#7bff76', duration: 1, delay: 0.5, opacity: 1, boxShadow: '#7bff76 0px 0px 10px 0px' })
  })
  const tl = gsap.timeline()
  tl.to("#person", { left: 0 })
  const t2 = gsap.timeline()
  t2.repeat(-1)
  t2.yoyo(true)
  t2.to("#more3", { opacity: 0, duration: 0.3 })
    .to("#more2", { opacity: 0, duration: 0.3 })
})
const prop = defineProps({
  random: {
    type: Number,
    required: true,
  }
})
const a = prop.random
const slog = ["从来没有人质疑日升月落，也没有人质疑万物生长。", "“我想让你坚信，我们仍可同行，在无尽花海中聆听……宇宙的声音。”", "晚安...", "沧海桑田，山河世变", "Miss You."]
console.log(prop.random)
</script>
<template>
  <div id="person">
    <div id="avat"><img id="ava" src="https://sakurasen.cn/icon" alt=""></div>
    <h1>Hi! This is SanMu.</h1>
    <p>{{ slog[a] }}</p>
    <span @click="goto" style="cursor: pointer;">Get More</span>
    <div @click="goto" id="more">

      <svg v-for="(index) in 3" :id="'more' + index" :key="index" :style="{ 'top': index * 0 }" t="1766941415654"
        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6378">
        <path
          d="M830.24 340.688l11.328 11.312a16 16 0 0 1 0 22.624L530.448 685.76a16 16 0 0 1-22.64 0L196.688 374.624a16 16 0 0 1 0-22.624l11.312-11.312a16 16 0 0 1 22.624 0l288.496 288.496 288.512-288.496a16 16 0 0 1 22.624 0z">
        </path>
      </svg>
    </div>
  </div>

</template>
<style>
.page {
  * {
    margin: 0;
    box-sizing: border-box;
  }

  padding: 2rem;
  text-align: center;

  h1 {
    font-size: 3rem;
    color: #fff;
  }

  h2 {
    font-size: 1.5rem;
    color: #fff;
  }
}

#more {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0;
  width: fit-content;
  height: fit-content;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    position: relative;
    margin: 0;
    width: 2rem;
    fill: #fff;
    height: 32px;
  }
}

#more2 {
  position: relative;
  top: -1rem !important;
}

#more3 {
  top: -2rem !important;
}

#person {
  width: 100svw;
  height: 100svh;

  span {
    color: #fff;
  }

  p {
    color: #fff;
    margin: 0 0 2rem 0;
  }

  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;

  h1 {
    color: #fff;
    margin: 1rem 0;
  }

  #avat {
    position: relative;
    width: 15rem;
    height: 15rem;
    background-color: transparent;
    padding: 1px;
    box-sizing: border-box;
    border-radius: 100%;
    justify-content: center;
    display: flex;

    img {
      opacity: 0;
      width: 100%;
      position: relative;
      border-radius: 100%;
    }
  }

  #avat::before {
    content: '❤️';
    font-size: 2rem;
    text-align: center;
    align-content: center;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 2.5rem;
    border-radius: 100%;
    height: 2.5rem;
    background-color: #fff;
    position: absolute;
    bottom: 0.3rem;
    right: 2rem;
    z-index: 999;
  }
}
</style>
