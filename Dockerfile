# 使用官方 Node.js 镜像作为基础镜像
FROM node:22-alpine

# 设置工作目录
WORKDIR /app

# 启用 Yarn
RUN corepack enable

# 复制 package.json 和 yarn.lock
COPY package.json yarn.lock ./

# 安装依赖
RUN yarn install --frozen-lockfile --production=false

# 复制项目文件
COPY . .

# 构建 Nuxt3 应用
RUN yarn build

# 暴露端口
EXPOSE 3000

# 设置环境变量（生产环境）
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# 启动应用
CMD ["node", ".output/server/index.mjs"]