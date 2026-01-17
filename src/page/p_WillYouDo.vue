<script lang="ts" setup>
import gsap from 'gsap';
import { onMounted, ref } from 'vue';
type resp = { "code": number, "id": number, "no": number, "question": string, "yes": number, "sel": number }
const qa = ref<resp>()
const seled = ref(false)
function GetQA() {
  fetch("https://b.sakurasen.cn/myapi/v1/home/GetQA").then((d) => d.json()).then((d) => {
    qa.value = d
    if (qa.value?.sel === 0) {
      return
    }
    seled.value = true
    gsap.to(".sel", {
      gap: 0,
      duration: 0,
    })
    if (qa.value?.sel === 1) {
      disp.value.tip = "有" + qa.value?.yes + "人和你一样"
      const count = (qa.value!.yes) / (qa.value!.no + qa.value!.yes)
      disp.value.yes = String(Math.floor(count * 100)) + "%"
      disp.value.no = String(Math.floor((1 - count) * 100)) + "%"
      gsap.to("#yes", {
        width: String(count * 15) + "rem",
        duration: 0.6,
        ease: "power2.out",
        color: "#fff",
        backgroundColor: "#339538"
      })
      gsap.to("#no", {
        flex: 1,
        ease: "power2.out",
        color: "#fff",
        backgroundColor: "#ff4b4b",
        duration: 0
      })
    } else {
      disp.value.tip = "有" + qa.value?.no + "人和你一样"
      const count = (qa.value!.no) / (qa.value!.no + qa.value!.yes)
      disp.value.no = String(Math.floor(count * 100)) + "%"
      disp.value.yes = String(Math.floor((1 - count) * 100)) + "%"
      gsap.to("#no", {
        width: String(count * 15) + "rem",
        duration: 0.6,
        ease: "power2.out",
        color: "#fff",
        backgroundColor: "#ff4b4b"
      })
      gsap.to("#yes", {
        flex: 1,
        ease: "power2.out",
        color: "#fff",
        backgroundColor: "#339538",
        duration: 0
      })
    }
  })
}

function Select(bl: boolean) {
  if (seled.value){
    return
  }
  seled.value = true
  gsap.to(".sel", {
    gap: 0,
    duration: 0,
  })
  if (bl) {
    fetch("https://api.sakurasen.cn/v1/home/UpQA?lol=" + "yes").catch(() => {
      seled.value = false
    })
    qa.value!.yes += 1
    disp.value.no = String(qa.value!.no)
    disp.value.yes = String(qa.value!.yes)
    const count = (qa.value!.yes) / (qa.value!.no + qa.value!.yes)
    disp.value.yes = String(Math.floor(count * 100)) + "%"
    disp.value.no = String(Math.floor((1 - count) * 100)) + "%"
    disp.value.tip = "有" + qa.value?.yes + "人和你一样"
    gsap.to("#yes", {
      width: String(count * 15) + "rem",
      duration: 0.6,
      ease: "power2.out",
      color: "#fff",
      backgroundColor: "#339538"
    })
    gsap.to("#no", {
      flex: 1,
      ease: "power2.out",
      color: "#fff",
      backgroundColor: "#ff4b4b",
      duration: 0
    })
  } else {
    fetch("https://api.sakurasen.cn/v1/home/UpQA?lol=" + "no").catch(() => {
      seled.value = false
    })
    qa.value!.no += 1
    disp.value.no = String(qa.value!.no)
    disp.value.yes = String(qa.value!.yes)
    const count = (qa.value!.no) / (qa.value!.no + qa.value!.yes)
    disp.value.no = String(Math.floor(count * 100)) + "%"
    disp.value.yes = String(Math.floor((1 - count) * 100)) + "%"
    disp.value.tip = "有" + qa.value?.no + "人和你一样"
    gsap.to("#no", {
      width: String(count * 15) + "rem",
      duration: 0.6,
      ease: "power2.out",
      color: "#fff",
      backgroundColor: "#ff4b4b"
    })
    gsap.to("#yes", {
      flex: 1,
      ease: "power2.out",
      color: "#fff",
      backgroundColor: "#339538",
      width: "3rem",
      duration: 0
    })
  }
}
onMounted(() => {
  GetQA()
})
const disp = ref({ no: "不是", yes: "是", tip: "做出您的选择" })
</script>
<template>
  <div class=" page will">
    <h1>匿名调查</h1>
    <p>每年更新一个问题</p>
    <p id="q">{{ qa?.question }}</p>
    <p id="tip">{{ disp.tip }}</p>
    <div class="sel">
      <span id="no" @click="Select(false)">{{ disp.no }}</span>
      <span id="yes" @click="Select(true)">{{ disp.yes }}</span>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

#tip {
  margin: 0 0 1rem 0;
  color: #fff564;
}

.sel {
  justify-content: center;
  align-items: center;
  display: flex;
  width: 15rem;
  justify-content: center;
  border-radius: 12px;
  gap: 2rem;
  height: 1.5rem;
  overflow: hidden;
  white-space: none;



  #yes {
    cursor: pointer;
    height: 100%;
    color: #5fff67;
  }

  #no {
    cursor: pointer;
    height: 100%;
    color: #ff4b4b;
  }
}

.will {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    color: #979797;
    text-shadow: none;
    font-size: 1.8rem;
  }

  p {
    color: #979797;
  }

  #q {
    color: #fff;
    margin: 1rem 0;
  }
}
</style>
