<template>
  <div class="w-full">
    <div class="font-heading font-bold text-center">
      <div class="grid grid-cols-4 mb-3">
        <span></span>
        <div class="col-span-2">
          屏幕事件
        </div>
        <div class="flex justify-end">
          <el-popconfirm class="box-item" title="确认删除日志吗？" width="170px" placement="bottom" @confirm="handleDeleteLog">
            <template #reference>
              <BaseIcon name="delete" size="20" :can-click="true"></BaseIcon>
            </template>
          </el-popconfirm>
        </div>
      </div>
      <div>
        <div v-for="(item, index) in logStore.logs" :key="index" class="grid grid-cols-4 space-y-1 text-center w-full">
          <div class="w-full flex justify-center items-cente textbold font-normal">
            {{ item.content }}
          </div>
          <div class="col-span-2 font-normal">
            {{ item.eventTime }}
          </div>
          <div>
            <el-button size="small" v-if="item.logType != 3" @click="openDetail(item)">详情</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" title="详情" width="70%">
      <div>
        <div v-if="selectLog?.logType == 1">
          <img :src="selectLog.data" alt="">
        </div>
        <div v-if="selectLog?.logType == 2">
          <div>
            {{ selectLog?.data }}
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { StoreLogType } from '~/types/types'
const dialogVisible = ref(false)
const logStore = useLogStore()
const selectLog = ref<StoreLogType>()
const handleDeleteLog = () => {
  logStore.clearLog()
}
const openDetail = (log: StoreLogType) => {
  if(log.logType == 2) {
    // @ts-ignore 
    log.data = log.data
  }
  selectLog.value = log
  dialogVisible.value = true
}
</script>

<style></style>