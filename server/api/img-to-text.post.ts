import { createWorker, OEM } from "tesseract.js";
import path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ base64: string }>(event);

  if (!body.base64) {
    return { error: "Missing base64 image data" };
  }
  const base64 = body.base64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64, "base64");

  // 创建 OCR worker（使用简体中文 chi_sim）
  const worker = await createWorker("eng+chi_sim", OEM.DEFAULT, {
    langPath: path.resolve('./public/tessdata')
  });

  // 识别图片
  const {
    data: { text },
  } = await worker.recognize(buffer);

  await worker.terminate();

  return {
    result: text,
  };
});
