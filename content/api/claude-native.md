---
title: Claude 原生接入
slug: /api/claude-native
group: api
summary: 按 Anthropic Messages API 的原生请求结构接入 Claude，重点看鉴权头、版本头和适用边界。
order: 20
legacyPath: /legacy-static/index.html#/api/claude-native
---

## 什么时候适合看这篇

如果你已经在用 Anthropic / Claude 原生请求结构，或者你希望继续沿用官方 SDK 的字段形态，这篇就是对应入口。

它最适合这些场景：

- 你已经有 Anthropic Messages API 旧代码
- 你不想为了统一协议，先把请求改成 OpenAI 风格
- 你的团队已经习惯了 `messages.create` 这一套结构

## 什么时候不该优先走它

如果你只是想先把一个对话模型快速接通，这一条通常不是最低成本路线。

对大多数新接入场景来说，更通用的仍然是：

- [OpenAI Compatible 接入](/api/openai-compatible)

所以这里不是“更高级”，而是“更适合已经在 Claude 原生生态里的人”。

## 基础规则

先把这四件事记住：

| 项目 | 值 |
| --- | --- |
| Base URL | `https://ergouzi.life` |
| Endpoint | `POST /v1/messages` |
| 鉴权头 | `x-api-key: <API_KEY>` |
| 版本头 | `anthropic-version: 2023-06-01` |

核心区别在于，这条线路不是 `Authorization: Bearer ...`，而是 `x-api-key`。

## 最小调用示例

```bash
curl --request POST \
  --url https://ergouzi.life/v1/messages \
  --header "content-type: application/json" \
  --header "x-api-key: $ERGOUZI_API_KEY" \
  --header "anthropic-version: 2023-06-01" \
  --data '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 1024,
    "messages": [
      { "role": "user", "content": "请概括一下 Ergouzi API 能做什么。" }
    ]
  }'
```

这段最小请求主要验证三件事：

- 入口是否通
- `x-api-key` 是否正确
- 当前 Token 分组是否支持你要用的 Claude 模型

## 适用建议

这条线路最有价值的地方，不是“模型更多”，而是**迁移成本低**。

适合继续沿用它的情况通常有：

- 已有 Anthropic SDK 代码，只想替换 base URL 和 API Key
- 业务依赖 Messages API 的字段结构和返回格式
- 你明确只接 Claude，不准备在同一层统一到 OpenAI Compatible

## 常见错误

### 1. 把它和 OpenAI 风格混着写

如果你选的是 Claude 原生入口，就按 Claude 原生字段来写。

最常见的混写问题是：

- 路径走 `/v1/messages`
- 但思路还在按 OpenAI 的 Bearer 头和字段命名写

这种写法最容易把自己绕进去。

### 2. 忘了带 `anthropic-version`

很多人只记得 Key，忘了版本头。

如果你走的是这条原生路线，`anthropic-version: 2023-06-01` 这类头通常要明确带上。

### 3. 结构没错，但模型本身不可用

如果请求格式看起来都对，仍然失败，优先检查：

- 当前 Token 分组是否支持该 Claude 模型

不要一上来先怀疑 curl 或 SDK。

## 和其他页面怎么配合

- [Claude SDK 接入](/sdk/claude)：如果你要进入项目代码层面
- [Claude 原生示例](/examples/claude)：如果你只想先复制一段可运行示例
- [OpenAI Compatible 接入](/api/openai-compatible)：如果你还在选路线

## 一句话总结

如果你本来就在用 Anthropic / Claude 原生结构，  
**最省事的做法不是强行改协议，而是继续沿用 `Messages API`，只把入口和 Key 切到 Ergouzi。**
