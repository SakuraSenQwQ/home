<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import gsap from 'gsap';
import { ref } from 'vue';
type songobj = {
  "cid": string,
  "name": string,
  "albumCid": string,
  "sourceUrl": string,
  "lyricUrl": string,
  "mvUrl": string,
  "mvCoverUrl": string,
  "artists": [
    string
  ]
}
type albumobj = {
  "cid": string,
  "name": string,
  "intro": string,
  "belong": string,
  "coverUrl": string,
  "coverDeUrl": string,
  "songs": [
    {
      "cid": string,
      "name": string
      "artistes": [string]
    }
  ]
}
type mlist = {
  "cid": string,
  "name": string,
  "albumCid": string,
  "artists": [
    string
  ]
}
const prop = defineProps({
  "random": Number
})
const musiclist = ref<mlist[]>([])
const now = ref('loading')
const open = ref(false)
const autoplay = ref(-1)
const whatisthis = ref(false)
const getlistisok = ref(true)
const initok = ref(false)
const SongInfo = ref<songobj>()
const AlbumInfo = ref<albumobj>()
const titleover = ref(false)
const isplay = ref(false)

//是否在播放
const playingtime = ref(0)
const audiotime = ref(0)
const AutoMusic = prop.random
const baseurl = "https://api.sakurasen.cn/v1"

const autolist = ["125074", "779480", "514530", "514533", "514540"]

function Start() {
  gsap.to(".music", {
    delay: 0.5,
    duration: 1,
    width: "16rem",
    ease: "power2.out",

  }).then(() => {
    open.value = true
    const dom = document.getElementsByClassName('music')[0] as HTMLElement
    dom.style.backgroundColor = "#ffffff"
    GetList()
  })
}

watch(open, () => {
  if (open.value) {
    setTimeout(() => {
      gsap.to(".mtitle", {
        duration: 0.5,
        opacity: 1,
        ease: "power2.out"
      })
    }, 0);
  }
})


//初始化时获取列表
function GetList() {
  fetch(baseurl + '/sairen/list')
    .then((d) => {
      return d.json()
    })
    .then((d) => {
      musiclist.value = d.data.list
      now.value = "已获取到" + musiclist.value.length + "首歌曲"
      init()
    }).catch(() => {
      now.value = "获取列表失败"
      setTimeout(() => {
        getlistisok.value = false
      }, 3000);
    })
}
function init() {
  GetSonginfo(autolist[AutoMusic!] ?? musiclist.value[autoplay.value]!.cid)
  now.value = "初始化中..."
  gsap.to(".music", {
    boxShadow: '#fff 0 0 0',
    duration: 0.5
  })
  now.value = "初始化完成"
  gsap.to("#m2info", {
    delay: 1,
    duration: 0.5,
    backgroundColor: "#fff",
    opacity: 0,
    ease: "none",
  }).then(() => {

    initok.value = true
    setTimeout(() => {
      dover()
    }, 1000);
  })
}
function GetAlbuminfo(id: string) {
  fetch(baseurl + '/sairen/album?id=' + id)
    .then((d) => d.json())
    .then((d) => {
      AlbumInfo.value = d.data
      Play()
    })
}
function GetSonginfo(id: string) {
  fetch(baseurl + '/sairen/song?id=' + id)
    .then((d) => d.json())
    .then((d) => {
      SongInfo.value = d.data
      GetAlbuminfo(SongInfo.value!.albumCid)
      Getlrc(SongInfo.value!.lyricUrl)
      setTimeout(() => {
        if (document.getElementById("mcover")) {
          Setting()
        }
        Play()
      }, 0);

    })
}

const audio = new Audio()
audio.autoplay = true

function Play() {
  nowlrcNum.value = 0
  const songurl = SongInfo.value!.sourceUrl
  nowlrc.value = ''
  audio.src = songurl
  audio.volume = 0.2

}
function Toplay() {
  gsap.to("#bplay", {
    rotate: "360deg",
    duration: 0.2,
    scale: 0
  })
    .then(() => {
      audio.play()
      isplay.value = !audio.paused
    }).then(() => {
      gsap.fromTo("#bpause", {
        scale: 0
      }, {
        scale: 1,
        duration: 0.2
      })
    })
}
function Topause() {
  gsap.to("#bpause", {
    rotate: "360deg",
    duration: 0.2,
    scale: 0,
  }).then(() => {
    audio.pause()
    isplay.value = !audio.paused
  }).then(() => {
    gsap.fromTo("#bplay", {
      scale: 0
    }, {
      scale: 1,
      duration: 0.2
    })
  })

}
function Setting() {
  const title = document.getElementById("music-title")
  const music = document.getElementsByClassName('music')[0]
  const cover = document.getElementById('mcover')
  const conwidth = music!.clientWidth - cover!.clientWidth
  if (title!.clientWidth > conwidth) {
    titleover.value = true
    MoveTit(conwidth)
  } else {
    titleover.value = false
    if (move) {
      move.kill()
    }
    gsap.set(title, { translateX: 0 })
  }
}
let move: GSAPTween
function MoveTit(Num: number) {
  const title = document.getElementById("music-title")
  if (titleover.value == true) {
    if (move) {
      move.kill()
      gsap.set(title, { translateX: 0 })
    }
    move = gsap.to(title, {
      translateX: -(title!.clientWidth - Num) - 20,
      yoyo: true,
      delay: 1,
      repeatDelay: 2,
      repeat: -1,
      duration: 6,
      ease: "none",
    })
  }
}

function Next() {
  autoplay.value += 1

  GetSonginfo(musiclist.value[autoplay.value]!.cid)
}
const formatTime = (seconds: number) => {
  if (!seconds) return '0:00';
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
};
const nowlrcNum = ref(0)
function overcon() {
  gsap.to(".music", {
    width: document.getElementById("mcover")?.clientHeight + 'px',
    duration: 1
  }).then(() => {
    over.value = true
  })
}
function opencon() {
  gsap.to(".music", {
    width: "16rem",
    duration: 1
  }).then(() => {
    over.value = false
  })
}

const over = ref(false)

onMounted(() => {

  Start()
  if (audio) {
    audio.addEventListener('timeupdate', () => {
      Setlrc()
    })
    audio.addEventListener('loadedmetadata', () => {
      audiotime.value = audio.duration

    })
    audio.addEventListener('playing', () => {
      isplay.value = !audio.paused
    })
    audio.addEventListener('ended', () => {
      Next()
    })
  }
})
function Setlrc() {
  playingtime.value = audio.currentTime
  const m = Math.floor(playingtime.value / 60)
  const s = playingtime.value - (m * 60)
  const timeM = lrcs.value[nowlrcNum.value]?.time.min || 0
  const timeS = lrcs.value[nowlrcNum.value]?.time.src || 0
  const ltimeM = lrcs.value[nowlrcNum.value + 1]?.time.min || 0
  const ltimeS = lrcs.value[nowlrcNum.value + 1]?.time.src || 0
  const lrc = lrcs.value[nowlrcNum.value]?.lrc || ''
  if (ltimeM == 0 && ltimeS == 0) {
    return
  }
  if (m > timeM && m >= ltimeM && (s >= ltimeS)) {
    nowlrcNum.value++
    Setlrc()
    return
  }
  if (s > timeS && s >= ltimeS && (m >= ltimeM)) {
    nowlrcNum.value++
    Setlrc()
    return
  }
  if (m <= ltimeM && m >= timeM) {
    if (s >= timeS) {
      nowlrc.value = lrc
      nowlrcNum.value += 1
      return
    }
  }
}
const nowlrc = ref('')
type lrcobj = { 'time': { 'min': number, 'src': number }, 'lrc': string }
const lrcs = ref<lrcobj[]>([])
function Getlrc(url: string) {
  if (url == undefined) {
    lrcs.value = []
    return
  }
  fetch(url, {
    referrerPolicy: 'no-referrer'
  })
    .then((d) => d.text())
    .then((d) => {
      ParseLrc(d)
    })
}
function ParseLrc(lrc: string) {
  const a = lrc.split('[').join('')
  const b = a.split('\r').join('')
  let c = b.split('\n')
  c = c.filter(item => {
    return item !== ""
  })
  c.map(item => {
    const a = item.split(']')
    const time = a[0]
    const timearr = time!.split(':')
    const obj = { "time": { 'min': Number(timearr[0]), 'src': Number(timearr[1]) }, "lrc": a[1]! }
    lrcs.value!.push(obj)
  })
}

function mcoverenter() {
  if (over.value) {
    opencon()
  }
}
function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    if (timer) {
      clearTimeout(timer);
    }

    if (immediate && !timer) {
      fn.apply(context, args);
    }

    timer = setTimeout(() => {
      if (!immediate) {
        fn.apply(context, args);
      }
      timer = null;
    }, delay);
  };
}
const dover = debounce(overcon, 2000, true)
function musicleave() {
  if (!over.value) {
    dover()
  }
}

</script>

<template>
  <div id="minfo" v-if="whatisthis">
    <h1>这是什么？</h1>
    <p>本项目是基于<a href="">塞壬唱片MSR</a>的接口实现的音乐播放器。</p>
    <p>版权归原作者及相关版权方所有。本站仅提供播放服务，所有音乐版权均属于版权所有者。若您认为本站侵犯了您的版权，请联系我们，我们会及时处理。</p>
    <span @click="whatisthis = false">关闭窗口</span>
  </div>
  <div class="music" v-if="getlistisok" @mouseleave="musicleave()">
    <div id="m2info" v-if="open && !initok">
      <h1 class="mtitle">塞壬唱片</h1>
      <span>{{ now }}</span>
    </div>
    <div id="play" v-show="initok">
      <img id="mcover" @mouseenter="mcoverenter()" @load="Setting()" :src="AlbumInfo?.coverUrl"
        referrerpolicy="no-referrer" alt="">
      <div id="con">
        <h2 id="music-title">{{ SongInfo?.name }}</h2>
        <span>{{ formatTime(playingtime) }}/{{ formatTime(audiotime) }}</span>
        <div id="but">
          <span style="cursor: pointer;" @click="Next()">
            <img style="transform: rotate(180deg);" src="/imgs/next.svg" alt="">
          </span>
          <span style="cursor: pointer;" v-if="!isplay" @click="Toplay()" id="bplay">
            <img src="/imgs/play.svg" alt="">
          </span>
          <span style="cursor: pointer;" v-if="isplay" @click="Topause()" id="bpause">
            <img src="/imgs/pause.svg" alt="">
          </span>
          <span style="cursor: pointer;" @click="Next()">
            <img src="/imgs/next.svg" alt="">
          </span>
        </div>
        <span @click="whatisthis = true" style="cursor: pointer;">这是什么？</span>
      </div>
    </div>
    <div id="mm" v-if="initok"><span @click="overcon()" style="cursor: pointer;">收回</span></div>
  </div>
  <div id="lrc">
    <span>{{ nowlrc }}</span>
  </div>

</template>

<style scoped>
#mm {
  position: absolute;
  right: 0rem;
  width: 1rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 9999;
}

#minfo {
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 99999;
  width: 25rem;
  padding: 2rem;
  box-shadow: #fff 0px 0px 12px;
  box-sizing: border-box;
  height: fit-content;
  background-color: #fff;
  top: 30svh;
  align-self: center;
  justify-self: center;

  p {
    font-weight: 600;
    font-size: 1.2rem;
  }

  span {
    cursor: pointer;
    font-size: 1.4rem;
  }

}

@media (width < 580px) {
  #minfo {
    top: 10vh;
    width: 20rem;
  }
}

#but {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 9rem;
  height: 1.5rem;
  justify-content: center;

  span {
    display: flex;
    height: 32px;

    img {
      z-index: 0;
      background-color: transparent;
      width: 100%;
      height: 100%;
    }
  }
}

#lrc {
  pointer-events: none;
  width: 100%;
  justify-content: center;
  display: flex;
  position: fixed;

  top: 0;
  margin: 0.2rem;

  span {
    color: #ffffff;
  }
}

#music-title {
  transform: translateX(0);
}

#con {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;

  h2 {
    margin: 0.1rem;
    font-size: 1rem;
    text-wrap-mode: nowrap;
  }

  span {
    text-align: center;
    width: 9rem;
  }
}

#play {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;


  img {
    background-color: #efffee;
    padding: 0.2rem;
    height: 100%;
    border-radius: 0 12px 12px 0;
    position: relative;
    z-index: 99999;
  }
}

.mtitle {
  opacity: 0;
}

#m2info {
  padding: 1rem;
  background-color: #000000;
  width: 100%;
  height: 100%;
  left: 0;
  position: relative;

  h1 {
    color: #fff;
  }

  span {
    color: #fff;
  }
}

.music {
  h1 {
    text-wrap-mode: nowrap;
    margin: 0;
  }

  border-radius: 0 12px 12px 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 0rem;
  height: 6rem;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;

  box-sizing: border-box;
  margin: 0;
  box-shadow: #fff 0 0 5px;
  background-color: #000000;
  backdrop-filter: blur(12px);
}
</style>
