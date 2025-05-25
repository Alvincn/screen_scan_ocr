<template>
  <svg
    v-if="innerContent"
    xmlns="http://www.w3.org/2000/svg"
    :class="[{'cursor-pointer': props.canClick, 'hover:opacity-70': props.canClick}]"
    @click="emitHandle"
    :width="size"
    :height="size"
    :style="props.style"
    viewBox="0 0 1024 1024"
    fill="currentColor"
    v-html="innerContent"
  ></svg>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 30 },
  style: { type: [String, Object], default: '' },
  canClick: {type: Boolean, default: false},
  onClick: {type: Function}
})

const emitHandle = (event: MouseEvent) => {
  if (props.canClick && typeof props.onClick === 'function') {
    props.onClick() 
  }
}

const innerContent = ref('')

watchEffect(async () => {
  try {
    const rawSvg = await import(`~/assets/icons/${props.name}.svg?raw`)
    const svgStr = rawSvg.default || rawSvg

    // 提取 svg 中的 <path> 或其他内容
    const match = svgStr.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i)
    innerContent.value = match?.[1] || ''
  } catch (err) {
    innerContent.value = ''
  }
})
</script>
