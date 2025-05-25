import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
    const body = await readBody<{ base64: string }>(event);

    if (!body.base64) {
        return { error: "Missing base64 image data" };
    }

    // 提取base64数据（移除data:image/png;base64,或其他前缀）
    const matches = body.base64.match(/^data:image\/\w+;base64,(.+)$/);
    if (!matches) {
        return { error: "Invalid base64 format" };
    }

    const buffer = Buffer.from(matches[1], "base64");

    // 生成文件路径
    const filename = `${uuidv4()}.jpg`;
    const filePath = join(process.cwd(), "public", "images", filename);

    // 确保 public/images 文件夹存在
    await writeFile(filePath, buffer);

    // 返回文件路径（可用于前端访问）
    return {
        success: true,
        url: `/images/${filename}`,
    };
});
