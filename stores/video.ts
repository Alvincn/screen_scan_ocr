import { defineStore } from 'pinia'

export const useMyVideoStore = defineStore("videoStore", {
  state: () => ({
    videoState: 0,
    ocrState: 0,
  }),
  actions: {
    setVideoState(state: number) {
      this.videoState = state
    },
    setOcrState(state: number) {
      this.ocrState = state
    }
  }
})
