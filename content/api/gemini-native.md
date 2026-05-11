---
title: Gemini 原生接入
slug: /api/gemini-native
group: api
summary: 按 Google Gemini 的原生请求格式接入，重点看 generateContent、streamGenerateContent 和 x-goog-api-key。
order: 30
legacyPath: /legacy-static/index.html#/api/gemini-native
---

## 什么时候适合看这篇

如果你已经在用 Google Gemini / GenAI 原生结构，或者你明确要保留 `generateContent`、`streamGenerateContent` 这套调用方式，这篇就是对应入口。

常见场景包括：

- 你已有 Gemini 原生代码
- 你准备直接使用 Google GenAI SDK
- 你的业务已经依赖 Gemini 原生字段结构

## 什么时候别优先走它

Gemini 原生入口只适用于 Gemini 模型。

如果你的目标是：

- 通用聊天接入
- 更容易切换不同模型族
- 先用最少字段把主流程跑通

那通常应先回到：

- [OpenAI Compatible 接入](/api/openai-compatible)

## 基础规则

这条线路最关键的规则如下：

| 项目 | 值 |
| --- | --- |
| Base URL | `https://ergouzi.life` |
| 非流式 | `POST /v1beta/models/{model}:generateContent` |
| 流式 SSE | `POST /v1beta/models/{model}:streamGenerateContent?alt=sse` |
| 鉴权头 | `x-goog-api-key: <API_KEY>` |

和 OpenAI Compatible 最大的不同点不是“路径长得不一样”，而是：

- 头不一样
- 请求体结构不一样
- 流式调用方式也不一样

## 非流式示例

```bash
curl --request POST \
  --url "https://ergouzi.life/v1beta/models/gemini-2.5-flash:generateContent" \
  --header "Content-Type: application/json" \
  --header "x-goog-api-key: $ERGOUZI_API_KEY" \
  --data '{
    "contents": [
      {
        "role": "user",
        "parts": [{"text": "请用一句话介绍 Ergouzi API。"}]
      }
    ]
  }'
```

## 流式 SSE 示例

```bash
curl --request POST \
  --url "https://ergouzi.life/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse" \
  --header "Content-Type: application/json" \
  --header "x-goog-api-key: $ERGOUZI_API_KEY" \
  --data '{
    "contents": [
      {
        "role": "user",
        "parts": [{"text": "给我一个 3 条的集成建议清单。"}]
      }
    ]
  }'
```

## 适用建议

这一条最适合的是“继续沿用原生结构”，而不是“第一次接入就一定要用它”。

它通常更适合：

- 原本就在用 Gemini 原生 API 的项目
- 想沿用 Google GenAI SDK 的项目
- 对原生字段和流式形态有明确依赖的业务

## 常见错误

### 1. 用 Gemini 原生路径去调非 Gemini 模型

这条线路只适用于 Gemini 模型。

如果你这里写的是 OpenAI 或 Claude 族模型，那方向一开始就错了。

### 2. 把 OpenAI Bearer 头搬过来

Gemini 原生这条线常见的是：

- `x-goog-api-key`

不是 `Authorization: Bearer ...`。

### 3. 请求结构混成了别的协议

如果你走的是 `generateContent` / `streamGenerateContent`，就按 Gemini 原生结构写 `contents` 和 `parts`。

不要一边走 Gemini 路由，一边脑子里还在用 OpenAI 的 `messages` 结构。

## 和其他页面怎么配合

- [Gemini SDK 接入](/sdk/gemini)：如果你要直接进 SDK 代码
- [Gemini 原生示例](/examples/gemini)：如果你只想先复制可运行示例
- [OpenAI Compatible 接入](/api/openai-compatible)：如果你还在选更通用的路线

## 一句话总结

Gemini 原生入口适合的是“沿用 Google 自己那套协议继续走”，  
而不是把所有接入都硬拐到原生格式上来。
