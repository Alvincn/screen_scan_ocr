<template>
    <client-only>
        <div class="w-full h-full flex flex-col items-center justify-center p-4">
            <div v-if="isMobile">
                🤯由于移动设备浏览器限制，暂不支持移动设备使用！
            </div>
            <div v-else class="flex justify-center w-2/3">
                <div
                    class="flex-1 bg-white shadow-lg border-2 border-gray-200 rounded-lg p-4 sm:w-full lg:w-1/2 flex flex-col items-center">
                    <div class="grid grid-cols-4 w-full">
                        <div class="flex items-center">
                            <el-popover class="box-item" title="问题" placement="bottom" width="500px">
                                <template #reference>
                                    <BaseIcon name="wen" :canClick="true" :size="25" />
                                </template>
                                <template #default>
                                    <strong class="text-bold">
                                        操作指南：
                                    </strong>
                                    <ul>
                                        <li>1. 在设置中设置关键词（需要匹配的词，多词使用“|”分割）</li>
                                        <li>2. 在设置中设置排除词（不希望出现的词，排除干扰项，多词使用“|”分割）</li>
                                        <li>3. 在设置中设置截屏时间（多久检测一次，单位 ms，1s = 1000ms）</li>
                                        <li>4. 在设置中设置邮箱（匹配后将会通过邮箱发送通知）</li>
                                        <li>5. 点击开始录屏，选择窗口/桌面，建议将窗口放大，提高 ocr 识别时间以及准确率</li>
                                        <li>6. 停止录制将会停止录制屏幕</li>
                                    </ul>
                                    <br/>
                                    <strong class="text-bold">
                                        其他：
                                    </strong>
                                    <ul>
                                        <li>1. 截屏内容仅用于 ocr 识别，我们不会保存您的截屏</li>
                                        <li>2. 所有日志、设置均保存在本地存储，我们不会保存您的内容</li>
                                    </ul>
                                </template>
                            </el-popover>
                        </div>
                        <h1 class="text-2xl font-heading font-bold text-center col-span-2">
                            屏幕检测助手
                        </h1>
                        <div class="flex flex-row-reverse">
                            <BaseIcon name="setting" :canClick="true" :onClick="showSetting" />
                        </div>
                    </div>
                    <div class="flex justify-center my-5">
                        <el-button type="success" @click="handleVideoStart">开始录制</el-button>
                        <el-button type="warning" @click="handleVideoStop">停止录制</el-button>
                    </div>
                    <div>
                        <VideoView ref="videoView"></VideoView>
                    </div>
                </div>
                <div
                    class="w-1/4 bg-white shadow-lg border-2 border-gray-200 rounded-lg p-4 flex flex-col items-center">
                    <VideoEvent></VideoEvent>
                </div>
            </div>

            <SettingDialog ref="settingDialog"></SettingDialog>
        </div>
    </client-only>
</template>

<script lang="ts" setup>
const { isMobile } = useDevice();
const settingDialog = ref(null);
const videoView = ref(null);
const showSetting = () => {
    if (settingDialog.value) {
        // @ts-ignore
        settingDialog.value.showSettingDialog();
    }
};
const handleVideoStart = () => {
    if (videoView.value) {
        // @ts-ignore
        videoView.value.captureScreen();
    }
};

const handleVideoStop = () => {
    if (videoView.value) {
        // @ts-ignore
        videoView.value.stopCaptureScreen();
    }
};
onMounted(() => {
    nextTick(async () => {
        // await captureScreen()
    });
});
</script>

<style></style>
