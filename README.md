# Ergouzi Docs

静态文档站，覆盖这些内容：

- Cherry Studio 应用集成
- API 集成：OpenAI 兼容、Claude 原生、Gemini 原生
- SDK 集成：OpenAI SDK、Claude SDK、Gemini SDK
- API 调用示例：Chat Completions、Responses、Images、Audio、Claude、Gemini

## 本地开发

先安装依赖：

```bash
npm install
```

开发模式：

```bash
npm run dev
```

构建后的本地预览：

```bash
npm run build
npm run preview
```

`npm run build` 现在会额外把两类静态文件补进 `dist/`：

- `assets/`：markdown 正文里直接引用的图片和旧版静态资源
- `legacy-static/`：旧版 hash 路由页面

这样生成出来的 `dist/` 才是完整可部署的发布包。

## Ubuntu 24.04 部署

项目根目录提供了一键部署脚本 [deploy_ubuntu_24_04.sh](./deploy_ubuntu_24_04.sh)。

再部署：

```bash
cd /path/to/docs
sudo bash ./deploy_ubuntu_24_04.sh
```

这个脚本会完成这些事情：

- 在服务器上自动安装依赖
- 在服务器上自动执行 `npm run build`
- 把 `dist/` 整体部署到 `/var/www/ergouzi-docs`
- 写入一个 `systemd` 静态服务
- 自动支持前端路由刷新回退到 `index.html`
- 保留图片、旧版静态页和 Vite 构建产物

如果仓库里有 `package-lock.json`，脚本会优先执行 `npm ci`；否则会回退到 `npm install`。

默认监听 `127.0.0.1:3001`。

如果你希望直接对外监听，而不是只给 Caddy 反代，可以这样部署：

```bash
cd /path/to/docs
sudo BIND_ADDRESS=0.0.0.0 bash ./deploy_ubuntu_24_04.sh
```

如果你想改端口，也可以一起指定：

```bash
cd /path/to/docs
sudo LISTEN_PORT=8080 bash ./deploy_ubuntu_24_04.sh
```

部署完成后可检查：

```bash
systemctl status ergouzi-docs
journalctl -u ergouzi-docs -n 100 --no-pager
```

如果你要让 Caddy 反代到这个服务，可以参考：

```caddyfile
docs.example.com {
    reverse_proxy 127.0.0.1:3001
}
```

如果你把服务直接暴露到公网，并且服务器启用了防火墙，记得放行 `3001/tcp`，例如：

```bash
sudo ufw allow 3001/tcp
```

如果你之前跑过旧版 `nginx` 脚本，而现在改用这个版本，可以按需手动停掉旧的 `nginx`：

```bash
sudo systemctl disable --now nginx
```

## 结构

- `src/`：React + Vite 前端源码
- `content/`：文档 Markdown 内容
- `assets/`：静态资源
- `dist/`：构建产物（由 `npm run build` 生成）
- `deploy_ubuntu_24_04.sh`：Ubuntu 24.04 一键部署脚本
