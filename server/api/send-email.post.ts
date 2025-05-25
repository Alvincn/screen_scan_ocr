// server/api/send-email.ts
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email: string
  }>(event)

  if (!body.email) {
    return { error: '参数不完整' }
  }
  // 创建邮件 transporter（使用你的 SMTP 配置）
  const transporter = nodemailer.createTransport({
    host: 'smtp.163.com',     // 例如：smtp.163.com、smtp.qq.com、smtp.gmail.com
    port: 465,
    secure: true,                 // true = 使用 SSL
    auth: {
      user: 'alvinkey@163.com',
      pass:  process.env.EMAIL_PASS,
    },
  })

  try {
    const info = await transporter.sendMail({
      from: '"屏幕检测助手通知" <alvinkey@163.com>', // 发件人地址
      to: body.email,                          // 收件人地址
      subject: "屏幕检测助手通知",                // 邮件标题
      text: "你的关键词有触发",                      // 纯文本内容（可选）
    })

    return {
      code: 0,
      messageId: info.messageId,
    }
  } catch (error: any) {
    console.error(error)
    return {
      code: 1,
      error: error.message || '发送失败',
    }
  }
})
