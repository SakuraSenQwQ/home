<script lang="ts" setup>
  import { ref } from 'vue'

  const url = window.location.href
  const u = new URL(url)
  const gt = u.searchParams.get("a")
  const cl = u.searchParams.get("b")
  console.log(gt, cl)
  const p = ref("加载中")
  const res = ref(null)
  const ok = ref(false)
  function cp() {
    navigator.clipboard.writeText("#终末地 人机验证 " + JSON.stringify(res.value))
  }
  if (gt == null || cl == null) {
    p.value = "参数错误！"
    alert(p.value)
  } else {
    const sc = document.createElement("script")
    sc.src = "https://static.geetest.com/static/js/gt.0.5.0.js"
    document.body.append(sc)
    sc.addEventListener("load", () => {
      const captchaBox = document.getElementById("captcha-box");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      initGeetest(

        {

          // 以下配置参数来自服务端 SDK

          gt: gt,

          challenge: cl,

          offline: false,

          new_captcha: true,

          api_server: "api.geevisit.com", //非必须参数，添加此字段用于修改极验api域名

        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function (captchaObj: any) {
          captchaObj.appendTo(captchaBox);
          captchaObj.onReady(function () {
            // DOM 准备好后，隐藏 #loading-tip 元素
            // 仅作示例用，用您适合的方式隐藏即可
            p.value = "请进行人机验证"
          });
          captchaObj.onSuccess(function () {

            const result = captchaObj.getValidate();

            console.log(result)
            res.value = result
            ok.value = true

          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          captchaObj.onError(function (error: any) {
            // 出错啦，可以提醒用户稍后进行重试
            // error 包含error_code、msg
            p.value = "加载错误"
            console.log(error.msg)
          });

        },

      );
    })
  }
</script>

<template>
<div class="main page">

  <div class="box ">
    <h1>人机验证</h1>
    <p>{{ p }}</p>
    <div id="captcha-box"></div>
    <div class="scus" v-if="ok">
      <p>认证通过</p>
      <p>请复制以下内容</p>
      <span @click="cp()">点击复制</span>
      <p>{{ "#终末地 人机验证 " + JSON.stringify(res) }}</p>
    </div>
  </div>

</div>
</template>

<style scoped>
.scus {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  word-break: break-all;
}

#captcha-box {
  display: flex;
  justify-content: center;
}

.box {
  display: flex;
  flex-direction: column;

  justify-content: center;

  h1,
  p {
    color: #fff;
    white-space: wrap;
  }

  span {
    color: #aeff6d;
  }
}
</style>
