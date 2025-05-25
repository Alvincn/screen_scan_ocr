import { defineStore } from "pinia";
import type { StoreLogType } from "~/types/types";

export const useLogStore = defineStore("logsStore", {
  state: (): {logs: StoreLogType[]} => ({
    logs: [],
  }),
  actions: {
    addLog(log: StoreLogType) {
      if(!log.eventTime) {
        let date = new Date()
        log.eventTime = date.toLocaleString()
      }
      // @ts-ignore
      this.logs.push(log);
    },
    removeLog(id: number) {
      this.logs.splice(id, 1);
    },
    clearLog() {
      this.logs = [];
    },
    setLogs(logs: StoreLogType[]) {
      // @ts-ignore
      this.logs = logs;
    },
  },
  persist: {
    key: "logs", // 存储到 localStorage 的 key（可选）
    pick: ["logs"], // 显式指定要持久化的字段（推荐）
  }, // 开启默认持久化（localStorage）
});
