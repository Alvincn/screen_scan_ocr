<template>
  <el-dialog
    v-model="dialogVisible"
    title="设置"
    :width="500"
  >
    <div>
      <el-form label-width="130px">
        <el-form-item label="关键词：">
          <el-input v-model="configs.keyWord"></el-input>
        </el-form-item>
        <el-form-item label="排除词：">
          <el-input v-model="configs.excludeWord"></el-input>
        </el-form-item>
        <el-form-item label="截取时间(ms)：">
          <el-input v-model="configs.cutTime" type="number"></el-input>
        </el-form-item>
        <el-form-item label="邮箱(用于通知)：">
          <el-input v-model="configs.email"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const dialogVisible = ref(false)
const useConfig = useMyConfigStore()
const configs = ref({
  keyWord: useConfig.keyWord,
  cutTime: useConfig.cutTime,
  email: useConfig.email,
  excludeWord: useConfig.excludeWord
})
const showSettingDialog = () => {
  dialogVisible.value = true
}

const closeSettingDialog = () => {
  dialogVisible.value = false
}

const handleConfirm = () => {
  useConfig.setState(configs.value)
  closeSettingDialog()
}

defineExpose({
  showSettingDialog,
  closeSettingDialog,
});
</script>

<style>

</style>