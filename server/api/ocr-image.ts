import { ocrSpace } from "ocr-space-api-wrapper";

export default defineEventHandler(async (event) => {
    const body = await readBody<{ base64: string }>(event);

    if (!body.base64) {
        return { error: "Missing base64 image data" };
    }
    // https://ocr.space/OCRAPI#PostParameters
    const result = await ocrSpace(body.base64, {
        apiKey: process.env.OCR_KEY,
        isOverlayRequired: true,
        isTable: true,
        language: "chs",
    });
    return result;
});
