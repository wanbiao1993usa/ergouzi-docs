---
title: OpenAI Compatible 接入
slug: /api/openai-compatible
group: api
summary: 用统一的 OpenAI Compatible 入口接入大多数文本、多模态、图片和音频场景。
order: 10
legacyPath: /legacy-static/index.html#/api/openai-compatible
---

## 为什么默认推荐这条路线

如果你没有强依赖某个厂商自己的原生字段格式，那么最推荐先走 **OpenAI Compatible**。

原因很直接：

- 学习成本最低
- 迁移成本最低
- 大多数客户端、SDK、脚本和现成示例都能直接套用

对新接入的人来说，它最大的优势不是“更高级”，而是 **最通用、最省事**。

你可以把它理解成一条统一入口：

- 文本对话
- 多模态输入
- 工具调用
- Responses
- Images
- Audio

这些常见场景都可以先沿用同一套 Bearer 鉴权和同一个根地址。

## 开始前先确认你已经有这些东西

在真正发送请求之前，先确认你已经准备好了：

- 一个可用的 Ergouzi API Token
- 这个 Token 所在分组支持你要用的模型
- 你已经理解 Token、分组和付费方式的关系

如果你对这些还不确定，建议先回去看：

- [账号与 Token 基础说明](/guides/token-billing)

如果你只是想先排掉 Key、地址和模型这层基础问题，也可以先跑：

- [OpenAI Compatible 最小示例](/examples/openai-compatible)

## 这条入口的基础规则

OpenAI Compatible 这条线，你只要先记住这三件事：

### Base URL

`https://ergouzi.life`

### 鉴权方式

`Authorization: Bearer <API_KEY>`

### 适合的场景

- 聊天
- 视觉输入
- 多模态
- 工具调用
- Responses
- Images
- Audio

这也是为什么我建议大多数新项目都先从这条线起步。

## 最小可调用示例

下面这段 `curl` 就是最小可验证请求。

```bash
curl --request POST \
  --url https://ergouzi.life/chat/completions \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \
  --data '{
    "model": "gpt-4o-mini",
    "messages": [
      {"role": "user", "content": "用两句话介绍 Ergouzi API。"}
    ]
  }'
```

如果你想先排除客户端和 SDK 的变量，只验证接口是否通了，这种最小请求最适合。

## 你在这条线上最容易犯的几个错

### 1. 以为有 Token 就一定能调通模型

不一定。  
真正决定能不能用某个模型的，是 **Token 所在分组是否支持这个模型**。

所以如果你请求失败，优先检查：

- 模型是否支持当前分组
- 不是先怀疑 curl 写法

### 2. 把原生 Claude / Gemini 入口和 OpenAI Compatible 混用

这条页面讲的是 OpenAI Compatible。  
如果你后面要用的是 Claude 原生字段格式，或者 Gemini 原生格式，那应该切到对应页面，而不是把三种请求结构混在一起。

### 3. 一开始就上复杂客户端

如果你还没验证过最小请求是否成功，就直接上复杂客户端、插件或本地 CLI，排错成本会很高。

更稳的顺序是：

1. 先用 `curl` 验证
2. 再接客户端或 SDK
3. 最后再做复杂配置

## 跑通后下一步怎么选

如果这条最小请求已经跑通，接下来按你的真实目标继续往下走：

### 先做最小验证，不急着进项目代码

- [OpenAI Compatible 最小示例](/examples/openai-compatible)

### 准备写正式项目代码

- [OpenAI SDK 接入](/sdk/openai)

### 聊天与传统消息结构

- [Chat Completions 示例](/examples/chat-completions)

### 新一代统一输入结构

- [Responses 示例](/examples/responses)

### 图像相关能力

- [Images 示例](/examples/images)

### 音频相关能力

- [Audio 示例](/examples/audio)

## 什么时候不该继续用它

虽然这条线最推荐，但也不是所有场景都必须用它。

下面这些情况，你可以考虑切到其他入口：

- 你已经有 Anthropic Messages API 的现成代码  
  那就去看 Claude 原生接入。

- 你已经有 Gemini `generateContent` / `streamGenerateContent` 的现成代码  
  那就去看 Gemini 原生接入。

重点不是哪个入口“更高级”，而是哪个入口更适合你当前已有的代码和工具链。

## 一句话的使用建议

如果你刚开始接入、没有历史包袱、也不想先处理太多字段差异：  
**先走 OpenAI Compatible，就是成本最低的方案。**
