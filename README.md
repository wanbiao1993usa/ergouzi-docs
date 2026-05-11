# Ergouzi Docs

纯静态文档站，覆盖：

- Cherry Studio 应用集成
- API 集成：OpenAI 兼容、Claude 原生、Gemini 原生
- SDK 集成：OpenAI SDK、Claude SDK、Gemini SDK
- API 调用示例：Chat Completions、Responses、Images、Audio、Claude、Gemini

## 本地预览

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

## Ubuntu 24.04 部署

项目根目录提供了一个一键部署脚本 [deploy_ubuntu_24_04.sh](/Users/biaowan/projects/docs/deploy_ubuntu_24_04.sh)。

它会完成这些事情：

- 在服务器上自动安装依赖
- 在服务器上自动执行 `npm run build`
- 把 `dist/` 发布到 `/var/www/ergouzi-docs`
- 写入一个 `systemd` 静态服务
- 启用 `systemctl enable ergouzi-docs`
- 让站点在每次开机后自动启动
- 不安装 `nginx`，适合直接挂在现有 `caddy` 后面

默认部署：

```bash
cd /path/to/docs
sudo bash ./deploy_ubuntu_24_04.sh
```

如果仓库里有 `package-lock.json`，脚本会优先执行 `npm ci`；否则会回退到 `npm install`。

默认会监听 `127.0.0.1:3001`。

如果你希望直接对外监听，而不是只给 Caddy 反代，可这样部署：

```bash
cd /path/to/docs
sudo BIND_ADDRESS=0.0.0.0 bash ./deploy_ubuntu_24_04.sh
```

如果你想改成别的端口，也可以一起指定：

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
