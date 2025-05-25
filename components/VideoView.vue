<template>
  <div>
    <div class="text-center mb-3">
      <div v-if="videoStore.videoState == 0">💫 未开启录制...</div>
      <div v-if="videoStore.videoState == 1">🌝 屏幕录制中...</div>
      <div v-if="videoStore.videoState == 2">🌚 请求权限失败...</div>
    </div>
    <video id="screenVideo" autoplay playsinline style="width: 100%; height: 100%"
      v-show="videoStore.videoState == 1"></video>
  </div>
</template>

<script lang="ts" setup>
import getLastOcrLog from '~/utils/arrayx'

const videoStore = useMyVideoStore()
const timer = ref<NodeJS.Timeout | null>(null)
let stream: MediaStream | null = null  // 保存全局 stream 引用
const logStore = useLogStore()
const configStore = useMyConfigStore()
// 授权并录制屏幕
const captureScreen = async () => {
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
    requestNotificationPermission()

    const video = document.getElementById("screenVideo") as HTMLVideoElement;
    if (video != null) {
      logStore.addLog({
        logType: 3,
        content: "开始录屏",
      })
      videoStore.setVideoState(1)
      video.srcObject = stream;
      await video.play();
      timer.value = setInterval(() => {
        let baseImgUrl = captureFrame()
        ocrImg(baseImgUrl)
      }, configStore.cutTime);
    }
  } catch (err) {
    videoStore.setVideoState(2)
    console.error("用户拒绝授权或发生错误", err);
  }
};

// 停止录制
const stopCaptureScreen = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    videoStore.setVideoState(0)
    stream = null
    logStore.addLog({
      logType: 3,
      content: "停止录屏",
    })
    clearInterval(timer.value as NodeJS.Timeout)
  }
};

// 保存图片到服务器
const sendSaveImg = async (base64Data: string) => {
  const res = await fetch("/api/save-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base64: base64Data }),
  });

  const data = await res.json();
  console.log(data.url);
};

// 识别图片中的文字
const ocrImg = async (base64Data: string | null) => {
  if (!configStore.email) {
    return ElMessage.warning("请先在设置中设置您的邮箱！")
  }
  if (base64Data) {
    videoStore.setOcrState(1)
    const res: { result: string } = await $fetch("/api/img-to-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64: base64Data }),
    });
    let resultText = res.result.replaceAll(" ", "")
    videoStore.setOcrState(0)
    checkKeyword(resultText)
  }
};

const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    alert("你的浏览器不支持通知功能");
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log("通知权限已授权");
  } else if (permission === 'denied') {
    console.warn("用户拒绝了通知权限");
  } else {
    console.log("用户尚未决定是否允许通知");
  }
};

const checkKeyword = async (parsedText: string) => {
  let keyWord = configStore.keyWord.split("|")
  let excludeWord = configStore.excludeWord.split("|")
  let prevTextData = getLastOcrLog(logStore.logs)
  let differentText = ""
  if (prevTextData == null) {
    differentText = parsedText
  } else {
    differentText = getDiffText(prevTextData, parsedText)
  }
  let result = keyWord.every(item => {
    return differentText.indexOf((item).trim()) != -1
  })
  let excludeResult = excludeWord.every(item => {
    return differentText.indexOf((item).trim()) == -1
  })
  logStore.addLog({
    logType: 2,
    content: "图片转文字",
    data: parsedText
  })
  // 如果匹配成功，发送邮件以及浏览器通知
  if (result && excludeResult) {
    const res: { code: number, messageId: string } = await $fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: configStore.email }),
    });
    if (Notification.permission === 'granted') {
      new Notification("屏幕检测助手", {
        body: '关键词触发！',
      });
    }
    if (res.code === 0) {
      logStore.addLog({
        logType: 4,
        content: "触发关键词",
        data: `邮件已发送至${configStore.email}`
      })
    }
  }
}

// 捕获屏幕帧
const captureFrame = (): string | null => {
  let ocrState = videoStore.ocrState
  if (ocrState == 1) {
    return null
  }
  const video = document.getElementById("screenVideo") as HTMLVideoElement;
  if (!video) return null;

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    let baseUrl = canvas.toDataURL("image/png");
    logStore.addLog({
      logType: 1,
      content: "截屏",
      data: baseUrl
    })
    return baseUrl;
  }

  return null;
};

defineExpose({
  captureScreen,
  stopCaptureScreen,
  sendSaveImg,
  ocrImg,
  captureFrame,
});

</script>

<style></style>
