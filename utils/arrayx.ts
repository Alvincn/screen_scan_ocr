import type { StoreLogType } from "~/types/types";

export default function getLastOcrLog(logs: StoreLogType[]) {
  for (let i = logs.length - 1; i >= 0; i--) {
    if (logs[i].logType === 2) {
      return logs[i].data;
    }
  }
  return null; // 没找到
}