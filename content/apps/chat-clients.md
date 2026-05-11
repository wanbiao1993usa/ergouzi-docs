---
title: 聊天客户端接入
slug: /apps/chat-clients
group: apps
summary: Next Chat、Lobe Chat、Chatbox、ChatWise、uTools 等聊天客户端的接入方式速查。
order: 40
legacyPath: /legacy-static/index.html#/apps/chat-clients
---

## 这篇内容适合谁

如果你要接入的是前端聊天客户端，而不是桌面 AI 应用或代码工具，这篇会更适合你。

它适合：

- Next Chat
- Lobe Chat
- Chatbox
- ChatWise
- uTools-ChatGPT 这类前端聊天客户端

这篇不是逐图教学，而是更像一份“统一填法速查页”。

如果你还没做过最小接口验证，建议先跑：

- [OpenAI Compatible 最小示例](/examples/openai-compatible)

## 先记住一条统一原则

这类客户端虽然字段名字看起来不完全一样，但大多数场景里，本质上都在做同一件事：

- 走 OpenAI Compatible 方式接入
- 填你的 Ergouzi API Key
- 地址尽量填根域名 `https://ergouzi.life`

只有个别客户端会把字段叫成：

- 站点地址
- Base URL
- API Host

但在这里，通常都先按根域名理解最稳。

## Cherry Studio 已单独拆页

Cherry Studio 不是放在这篇合集里讲，而是已经单独整理成完整页面了：

- [Cherry Studio 集成](/apps/cherry-studio)

如果你用的是 Cherry Studio，直接跳过去看会更清楚。

## Next Chat

Next Chat 最适合用它的一键导入方式先把基础参数塞进去。

示例导入链接格式：

```text
https://{your-next-chat-domain}/#/?settings={"key":"<YOUR_API_KEY>","url":"https://ergouzi.life"}
```

关键点：

- **API Key**：你的 Ergouzi Token
- **URL / API 地址**：`https://ergouzi.life`

如果你还要兼容其它厂商模型，可以继续按 OpenAI 风格做自定义模型声明，例如：

- `+claude-sonnet-4@OpenAI`

## Lobe Chat

Lobe Chat 这条线的思路最直接：

- 打开应用配置
- 进入语言模型
- 找到 OpenAI
- 把 API Key 和 Base URL 改成 Ergouzi

推荐填法：

- **配置位置**：应用配置 → 语言模型 → OpenAI
- **API Key**：你的 Ergouzi Token
- **Base URL**：`https://ergouzi.life`

后面再点击获取模型列表，并手动启用需要的模型。

## Chatbox

Chatbox 更像开发工具型客户端，所以它的字段通常更接近 OpenAI API 原始概念。

推荐填法：

- **模型提供方**：`OpenAI API`
- **API Key**：你的 Ergouzi Token
- **API Base URL**：`https://ergouzi.life`
- **模型名**：优先从可用模型列表复制，或先手动填一个确定可用的模型 ID

如果模型列表看不到，不代表一定不能用。  
你可以先手动填一个确认可用的模型名验证联通性。

## ChatWise

ChatWise 的常见填法是新增一个 `OpenAI Compatible` 提供商。

推荐参数：

- **提供商类型**：`OpenAI Compatible`
- **API 地址**：`https://ergouzi.life`
- **API Key**：你的 Ergouzi Token
- **模型**：保存后选择可用模型开始对话

这里也要注意，它的字段虽然不是写着 “Base URL”，但本质上仍然是同一套接入逻辑。

## uTools-ChatGPT 助手

uTools 这类工具的原教程有时只给界面截图，没有逐项解释。  
在这种情况下，可以优先按同类 OpenAI Compatible 客户端的思路来填：

- **接入方式**：自定义 / OpenAI Compatible 服务
- **API Key**：你的 Ergouzi Token
- **API Base URL**：`https://ergouzi.life`
- **模型**：先填一个确定可用的聊天模型做联通测试

如果这个版本的插件本身支持自定义地址，那这套填法通常就是最稳的起点。

## 这组客户端最常见的问题

### 界面只让填“站点地址”

那就先直接填根域名：

- `https://ergouzi.life`

### 提示模型不存在

优先检查：

- 模型名是否和平台实际开放的一致
- 特别是 Claude / Gemini 这类自定义别名有没有写错

### 能保存但无法请求

最常见原因通常是：

- Key 没权限
- 地址填错
- 客户端把根域名和 Base URL 重复拼接了

## 一句话总结

大多数聊天客户端这条线，都可以先按同一个思路来理解：

**填 Ergouzi Token，地址先填根域名 `https://ergouzi.life`，再验证模型是否可用。**

如果你只是想先接通，这通常是最省事的起点。

## 和其他页面怎么配合

- [Cherry Studio 集成](/apps/cherry-studio)：如果你用的是独立桌面客户端
- [OpenAI Compatible 接入](/api/openai-compatible)：如果你想先把接口规则看清
- [OpenAI Compatible 最小示例](/examples/openai-compatible)：如果你想先排掉 Key 和地址问题
