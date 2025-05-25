import { defineStore } from "pinia";
import type { ConfigType } from "~/types/types";

export const useMyConfigStore = defineStore("myConfigStore", {
  state: (): ConfigType => ({
    keyWord: "在线",
    excludeWord: "分钟前",
    cutTime:  5000,
    email: ""
  }),
  actions: {
    setState(data: ConfigType) {
      this.cutTime = data.cutTime;
      this.keyWord = data.keyWord;
      this.email = data.email
    },
  },
  persist: {
    key: "my-config", // 存储到 localStorage 的 key（可选）
    pick: ["keyWord", "cutTime", "email"], // 显式指定要持久化的字段（推荐）
  }, // 开启默认持久化（localStorage）
});
