<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
const contactlist = ref()
const isphone = ref(false)
function GetList() {
  fetch("./contact.json")
    .then((d) => d.json())
    .then((d) => {
      contactlist.value = d
    })
}

const contactop = ref(0)
function sroll(e: WheelEvent) {
  if (isphone.value) {
    return
  }
  contactop.value -= (e.deltaY / 50)
  if (contactop.value > 12) {
    contactop.value = 12
  }
  if (contactop.value < -12) {
    contactop.value = -12
  }
  gsap.to("#contact", {
    top: contactop.value + 'rem',
    duration: 0.5,
    ease: 'power2.out'
  })
}
const touchstart = ref(0)
const touchval = ref(0)
const lasttouch = ref(0)
function touchs(e: TouchEvent) {
  if (isphone.value) {
    touchstart.value = e.touches[0]!.clientX
    lasttouch.value = touchstart.value
  } else {
    touchstart.value = e.touches[0]!.clientY
    lasttouch.value = touchstart.value
  }
}

function touch(e: TouchEvent) {
  if (isphone.value) {
    lasttouch.value = e.touches[0]!.clientX
    const move = e.touches[0]!.clientX - touchstart.value
    touchval.value += move / 10
    if (move < 0 && e.touches[0]!.clientX >= lasttouch.value) {
      touchstart.value = lasttouch.value
    }
    if (move > 0 && e.touches[0]!.clientX <= lasttouch.value) {
      touchstart.value = lasttouch.value
    }
    if (touchval.value >= 25) {
      touchval.value = 25
    }
    if (touchval.value <= -25) {
      touchval.value = -25
    }
    gsap.to("#contact", {
      x: touchval.value + 'rem',
      duration: 0.2,
      ease: 'power2.out'
    })
  } else {
    lasttouch.value = e.touches[0]!.clientY
    const move = e.touches[0]!.clientY - touchstart.value
    touchval.value += move / 10
    if (move < 0 && e.touches[0]!.clientY >= lasttouch.value) {
      touchstart.value = lasttouch.value
    }
    if (move > 0 && e.touches[0]!.clientY <= lasttouch.value) {
      touchstart.value = lasttouch.value
    }
    if (touchval.value >= 12) {
      touchval.value = 12
    }
    if (touchval.value <= -12) {
      touchval.value = -12
    }
    gsap.to("#contact", {
      x: touchval.value + 'rem',
      duration: 0.2,
      ease: 'power2.out'
    })
  }

}
const mousedown = ref(false)
const mousedownval = ref(0)
const dragval = ref(0)
function dragstart(e: MouseEvent) {
  if (!isphone.value) {
    mousedownval.value = e.clientY

  } else {
    mousedownval.value = e.clientX
  }
}
const lastdrag = ref(0)
function drag(e: MouseEvent) {
  if (!mousedown.value) {
    return
  }
  if (!isphone.value) {
    lastdrag.value = e.clientY
    const move = e.clientY - mousedownval.value
    dragval.value += move / 10
    if (move < 0 && e.clientY >= lastdrag.value) {
      mousedownval.value = lastdrag.value
    }
    if (move > 0 && e.clientY <= lastdrag.value) {
      mousedownval.value = lastdrag.value
    }
    if (dragval.value >= 12) {
      dragval.value = 12
    }
    if (dragval.value <= -12) {
      dragval.value = -12
    }
    gsap.to("#contact", {
      top: dragval.value + 'rem',
      duration: 0.2,
      ease: 'power2.out'
    })
  } else {
    lastdrag.value = e.clientX
    const move = e.clientX - mousedownval.value
    dragval.value += move / 20
    if (move < 0 && e.clientX >= lastdrag.value) {
      mousedownval.value = lastdrag.value
    }
    if (move > 0 && e.clientX <= lastdrag.value) {
      mousedownval.value = lastdrag.value
    }
    if (dragval.value >= 25) {
      dragval.value = 25
    }
    if (dragval.value <= -25) {
      dragval.value = -25
    }
    gsap.to("#contact", {
      x: dragval.value + 'rem',
      duration: 0.2,
      ease: 'power2.out'
    })
  }
}
function touchend() {
  touchval.value += 1

  if (isphone.value) {
    if (touchval.value > 25) {
      touchval.value = 25
    }
    if (touchval.value < -25) {
      touchval.value = -25
    }
    gsap.to("#contact", {
      x: touchval.value + 'rem',
      duration: 0.5,
      ease: 'power2.out'
    })
  } else {
    if (touchval.value > 12) {
      touchval.value = 12
    }
    if (touchval.value < -12) {
      touchval.value = -12
    }
    gsap.to("#contact", {
      y: touchval.value + 'rem',
      duration: 0.5,
      ease: 'power2.out'
    })
  }
}
const date = new Date()
const years = date.getFullYear()
onMounted(() => {
  GetList()
  addEventListener('mouseup', () => {
    mousedown.value = false
  })
  addEventListener('mousedown', () => {
    mousedown.value = true
  })
})
function isit() {
  const width = window.innerWidth
  if (width < 588) {
    isphone.value = true
    gsap.to("#contact", {
      x: 0,
      duration: 0.2,
      ease: 'power2.out'
    })
  } else {
    isphone.value = false
    gsap.to("#contact", {
      top: 0,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
}
onMounted(() => {
  isit()
})
window.addEventListener('resize', () => {
  isit()
})
const skilist = [
  { "name": "Go", "color": "#00ADD8" },
  { "name": "Vue", "color": "#41b883" },
  { "name": "HTML", "color": "#e34c26" },
  { "name": "JavaScript", "color": "#f1e05a" },
  { "name": "CSS", "color": "#663399" },
]

</script>
<template>
  <div id="whoami" class="page">
    <h1>关于我</h1>
    <div id="info">
      <div id="moreinfo">
        <h2>叁睦</h2>
        <span>
          <a href="https://baike.baidu.com/item/%E5%B9%B3%E9%A1%B6%E5%B1%B1%E5%B8%82/441923" target="blank">河南·平顶山</a>
        </span>
        <span>{{ years - 2007 }} in {{ years }}</span>
        <p>普通人，没什么好写的</p>
      </div>
      <div id="line"></div>
      <div id="cs" @wheel.prevent="sroll" @touchend="touchend" @mousedown="dragstart" @touchstart="touchs"
        @mousemove="drag" @touchmove.prevent="touch">
        <div id="contact">
          <div id="contactbox" draggable="false" :style="{ 'background-color': val.bc }"
            v-for="(val, index) in contactlist" :key="index">
            <div id="icon">
              <img :src="val.icon" draggable="false" alt="">
            </div>
            <span>{{ val.name }}</span>
            <p>{{ val.info }}</p>
          </div>
        </div>
      </div>

    </div>
    <div id="skill">
      <div id="sks"><i id="sk" v-for="(value, index) in skilist" :key="index" :style="{ '--back': value.color }">{{
        value.name }}</i></div>
    </div>
  </div>
</template>
<style scoped>
a {
  text-decoration-line: none;
  color: #a9ff94;
}

#sk::after {
  width: 0.5rem;
  height: 0.5rem;
  filter: blur(1px);
  background-color: var(--back);
  box-shadow: var(--back) 0 0 1px;
  position: absolute;
  content: '';
  left: -1rem;
  border-radius: 100%;
  justify-self: center;
  align-self: center;
}

#sk {
  display: flex;
  position: relative;
  color: #fff;
}

#sks {
  padding: 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

#skill {

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    color: #ff4949;
  }
}

#whoami {
  h1 {
    color: #328bf0;
    margin: 0 0 1rem 0;
    text-shadow: #328bf0e0 0 0 3px;
  }
}

#cs {
  cursor: grab;
  width: 14rem;
  height: 10rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
}


#contact {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  top: 0;
}

#contactbox {
  span {
    font-size: 1.5rem;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: skew(12deg);
    padding: 0 10%;
    opacity: 0.3;
    font-weight: 700;
  }

  p {
    margin: 0;
    padding: 0;
    position: absolute;
    justify-content: center;
    align-self: center;
    text-align: center;
    width: 100%;
    font-size: 2rem;
    font-weight: 600;
    color: #fff;
    text-shadow: #000 1px 1px 4px;
  }

  user-select: none;
  position: relative;
  display: flex;
  width: 12rem;
  height: 5rem;
  overflow: hidden;
  border-radius: 12px;

  #icon {
    opacity: 0.5;
    height: 5rem;
    width: 5rem;
    display: flex;

    img {
      height: 100%;
    }
  }
}

#line {
  box-sizing: border-box;
  margin: 2rem;
  height: 5rem;
  width: 0.6rem;
  background-color: #fff;
  content: '';
}

#moreinfo {
  display: flex;
  flex-direction: column;
  margin-left: 1.2rem;
  color: #fff;
  justify-content: center;
  text-align: start;
  height: 100%;
  gap: 0.3rem;
}

#info {
  display: flex;
  padding: 2rem;
  justify-content: center;
  align-items: center;

  img {
    width: 300px;
  }
}

@media (width < 588px) {
  #info {
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  #line {
    display: none;
  }

  #moreinfo {
    text-align: center;
    margin: 0 0 2rem;
  }

  .page {
    padding: 0 !important;
  }

  #cs {
    position: relative;
    display: flex;
    width: 100%;
    height: 5rem;

    #contact {
      display: flex;
      flex-direction: row;
      width: fit-content;
      flex-wrap: nowrap;
      position: absolute;
    }
  }
}
</style>
