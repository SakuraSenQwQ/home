<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import gsap from 'gsap';
type friendobj = {
  "name": string
  "avat": string
  "url": string
  "bio": string
  "color1": string
  "color2": string
}
const isphone = ref(false)

const page = ref(0)
const loaded = ref(false)

//这是友链列表（左侧）
const friendslist = ref<friendobj[]>()

// 这是友链列表（右侧）
const friendslist2 = ref<friendobj[][]>()

//何意味，将列表分成每5个一组
function SetList2(arr: friendobj[]): friendobj[][] {
  const a = []
  const al = []
  al.push(...arr)
  if (al.length <= 5) {
    return [al]
  }
  for (let i = 1; i <= Math.floor(arr.length / 5); i++) {
    a.push(al.slice((i - 1) * 5, 5 * i))
  }
  if (arr.length - Math.floor(arr.length / 5) * 5 !== 0) {
    a.push(al.slice(Math.floor(arr.length / 5) * 5, arr.length))
  }
  return a
}
function GetList() {
  fetch('./json/friends.json')
    .then((d) => d.json())
    .then((d) => {
      const a = []
      a.push(...shuffle(d))
      friendslist.value = a
      const l2 = SetList2(a)
      friendslist2.value = l2
      loaded.value = true
    })
}
function isit() {
  const width = window.innerWidth
  if (width < 1073) {
    isphone.value = true
  } else {
    isphone.value = false
  }
}
let pb: gsap.core.Tween
let self: gsap.core.Tween
function loadavat() {
  pb = gsap.to("#cov", {
    rotate: 360,
    duration: 60,
    delay: 0,
    ease: 'none',
    repeat: -1,
  })
  const list = document.querySelectorAll('.avats')
  self = gsap.to(list, {
    rotate: 360,
    duration: 15,
    delay: 0,
    ease: 'none',
    repeat: -1,
  })
  self.play()
}
onMounted(() => {
  GetList()
  isit()

  window.addEventListener('resize', () => {
    isit()
  })
  window.addEventListener('load', () => {
    select(0)
  })
})

onUnmounted(() => {
  console.log("bye")
})


//为啥呢，只有这个load加载完才能获取所有列表:(

function shuffle(arr: friendobj[]): friendobj[] {
  const res = [...arr]
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[res[i]!, res[j]!] = [res[j]!, res[i]!]
  }
  return res
}
function select(num: number) {
  page.value = num

  for (let i = 1; i <= friendslist2.value!.length; i++) {
    const b = document.getElementById('s' + i)
    b?.classList.remove('seled')
  }
  const a = document.getElementById('s' + (num + 1))
  a?.classList.add('seled')
}
const info = ref<friendobj>()
const now = ref()
function sel(num: number) {
  if (now.value == num) {
    info.value = undefined
    now.value = undefined
    for (let i = 0; i < friendslist.value!.length; i++) {
      const a = document.querySelector('.p' + i)
      a?.classList.remove('select')
      gsap.to(a, {
        opacity: 1,
        duration: 0.5
      })
    }
    return
  } else {
    info.value = friendslist.value![num]
    for (let i = 0; i < friendslist.value!.length; i++) {
      const a = document.querySelector('.p' + i)
      if (i == num) {
        now.value = i
        a?.classList.add('select')
        gsap.to(a, {
          opacity: 1,
          duration: 0.5
        })
        continue
      }
      a?.classList.remove('select')
      gsap.to('.p' + i, {
        opacity: 0.3,
        duration: 0.5
      })
    }
  }

}
const imgload = ref(false)
watch(imgload, () => {
  loadavat()
})
</script>
<template>

  <div id="friends" class="page">
    <h1>朋友们</h1>
    <div id="main">
      <div id="roll">
        <div id="infos" v-if="!isphone">
          <img v-if="info?.avat !== undefined" :src="info?.avat" alt="">
          <h2 :style="{ color: info?.color1 }">{{ info?.name }}</h2>
          <p :style="{ color: info?.color2 }">{{ info?.bio }}</p>
          <a :href="'https://'+info?.url+'?from=3mua.cn'">{{ info?.url }}</a>
        </div>
        <div id="cov">
          <div v-for="(d, index) in friendslist" id="friend" :class="'p' + index" :key="index"
            :style="{ 'transform': 'rotate(' + (index) * (360 / friendslist!.length) + 'deg) translate(' + (isphone ? 4 : 12) + 'rem)' }">
            <div id="icon" @click="sel(index);" @mouseenter="isphone ? '' : pb.pause(); self.pause();"
              @mouseleave="isphone ? '' : pb.play(); self.play();"><img @load="imgload = true" class="avats"
                draggable="false" :src="d.avat" alt=""></div>
          </div>
        </div>
      </div>

      <!-- 手机端显示 -->
      <div id="infos" v-if="isphone">
        <img v-if="info?.avat !== undefined" :src="info?.avat" alt="">
        <div>
          <h2 :style="{ color: info?.color1 }">{{ info?.name }}</h2>
          <p :style="{ color: info?.color2 }">{{ info?.bio }}</p>
          <a :href="'https://'+info?.url+'?from=3mua.cn'" target="_blank">{{ info?.url }}</a>
        </div>
      </div>


      <div id="list" v-if="loaded">
        <div id="fl" @click="sel(index);" v-for="(d, index) in friendslist2![page]" :key="index">
          <h2 :style="{ color: d.color1 }">{{ d.name }}</h2>
          <p :style="{ color: d.color2 }">{{ d.bio }}</p>

        </div>
        <div id="sel" v-if="loaded && friendslist2!.length > 1"><span v-for="a in friendslist2?.length" :key="a"
            :id="'s' + a" @click="select(a - 1)">{{ a
            }}</span>
        </div>
      </div>
    </div>
    <div id="andmore">
      <p>友情链接每次刷新都会随机排列</p>
      <p>本站与友情链接无任何从属关系，不做任何保障</p>
      <div style="display: flex; gap: 2rem;"><a class="link" href="https://blog.sakurasen.cn/post/friendlink/"
          target="_blank">申请友链</a><a class="link" href="https://blog.sakurasen.cn/post/friendlink/"
          target="_blank">问题反馈</a></div>
    </div>
  </div>
</template>
<style scoped>
.link {
  color: #c6ffa1;
}

#andmore {
  p {
    color: #ffadad83;
    margin: 0;
  }

  span {
    color: #c6ffa1;
  }

  width: 100svw;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#sel {
  display: flex;
  gap: 2rem;

  span {
    color: #fff;
  }
}

.seled {
  transition: 0.4s;
  text-shadow: #fff 0 0 2px;
  color: #75c8ff !important;
}

.select {
  border-radius: 100%;
  box-shadow: #fff 0 0 15px;
}

#list {
  cursor: pointer;
  justify-self: center;
  align-self: center;
  text-align: start;
  display: flex;
  width: 20rem;
  flex-direction: column;
  gap: 1rem;
}

.avats {
  cursor: pointer;
  transform: rotate(0);
}

#main {
  justify-self: center;
  align-self: center;
  width: 100%;
  justify-content: center;
  display: flex;
}

#infos {
  display: flex;
  justify-self: center;
  align-self: center;
  flex-direction: column;
  text-align: center;
  width: 80%;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 12px;
    width: 120px;
    height: 120px;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    color: #fff;
  }

  a {
    cursor: pointer;
    text-decoration-line: none;
    color: #c6ffa1;
  }

}

#roll {
  margin: 5rem;
  justify-content: center;
  display: flex;
  width: 30rem;
  height: 30rem;
  border-radius: 100%;
  border: dashed 1px #aaa;
  position: relative;
  transform: rotate(0deg);
}

#cov {
  pointer-events: none;
  width: 100%;
  transform: rotate(0deg);
  height: 100%;
  position: absolute;
}


#friend {
  cursor: pointer;
  pointer-events: all;
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 0 0;

  #icon {
    display: flex;


    img {
      border-radius: 100%;
      width: 80px;
      height: 80px;
    }
  }
}



#friends {

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: #328bf0;
    text-shadow: #328bf0 0 0 2px;
  }


}

@media (width <1073px) {
  #phinfo {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  #infos {
    width: 15rem;
    display: flex;
    flex-direction: row;
    position: relative;
    margin: 1.5rem 0;
    gap: 0.4rem;
  }

  #main {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  #roll {
    justify-self: center;
    align-self: center;
    margin: 2rem;
    justify-content: center;
    display: flex;
    padding: 0;
    width: 10rem;
    height: 10rem;
    border-radius: 100%;
    border: dashed 1px #aaa;
    position: relative;
    transform: rotate(0deg);
  }

  #cov {
    width: 100%;
    transform: rotate(0deg);
    height: 100%;
    position: absolute;
  }


  #friend {
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: 0 0;

    #icon {
      display: flex;


      img {
        border-radius: 100%;
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
