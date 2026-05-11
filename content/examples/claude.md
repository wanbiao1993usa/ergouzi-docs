---
title: Claude 原生示例
slug: /examples/claude
group: examples
summary: 使用 Claude 原生 Messages API 发起请求，包括 curl 和 Python SDK 两种方式。
order: 50
legacyPath: /legacy-static/index.html#/examples/claude
---

## 这篇内容适合谁

如果你已经决定不走 OpenAI Compatible，而是继续保持 Anthropic / Claude 原生请求结构，这篇就是最直接的示例页。

它适合：

- 你原本就按 Claude Messages API 在写代码
- 你希望继续沿用 `messages.create` 这套心智模型
- 你想快速验证 Claude 原生入口是否接通

## Claude 原生接口和 OpenAI Compatible 的区别

这条路线最核心的区别，不在于模型是否能调用，而在于：

- 请求结构不同
- 鉴权头不同
- SDK 和字段约定不同

所以如果你已经在 Claude 原生生态里，就没必要为了“统一”强行先改成 OpenAI 风格。

## 最小 curl 示例

下面这段就是最常见的 Claude 原生最小请求：

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
      { "role": "user", "content": "Hello, Claude" }
    ]
  }'
```

这条示例主要是为了验证三件事：

- Claude 原生入口是否通
- `x-api-key` 鉴权是否正确
- 当前 Token 分组是否支持你写的 Claude 模型

## Python SDK 示例

如果你本来就用的是官方 Anthropic SDK，可以继续沿用它，只把 API Key 和 `base_url` 改成 Ergouzi：

```python
import anthropic

client = anthropic.Anthropic(
    api_key="your_api_key_here",
    base_url="https://ergouzi.life",
)

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude"}
    ],
)

print(message.content)
```

这条路线的重点是：

- 你仍然使用官方 Anthropic SDK
- 仍然走 `messages.create`
- 只是把请求发到了 Ergouzi

## 什么时候更适合继续用 Claude 原生

下面这些情况，继续用这条路线通常最省心：

- 你已有 Anthropic Messages API 旧代码
- 你团队已经熟悉 Claude 原生字段
- 你不想为了统一协议去改写请求结构

## 最容易犯的几个错误

### 1. 把它和 OpenAI 风格混写

如果你选的是 Claude 原生接口，就按 Claude 原生字段来写。  
不要一边走 `/v1/messages`，一边又按 OpenAI `messages` 风格去想参数和头部。

### 2. 忘了用 `x-api-key`

这条接口的常见鉴权头不是 `Authorization: Bearer ...`，而是：

- `x-api-key: <API_KEY>`

### 3. 模型本身不可用

如果结构看起来都对，但还是失败，优先检查：

- 当前 Token 分组是否支持这个 Claude 模型

不要一上来先怀疑 SDK 或 curl。

## 和其他页面怎么配合

你可以这样理解这几页的关系：

- [OpenAI Compatible 接入](/api/openai-compatible)：更通用
- [Claude SDK 接入](/sdk/claude)：更适合项目代码接入
- 这篇示例页：更适合快速验证 Claude 原生入口和字段结构

## 一句话总结

如果你本来就在用 Anthropic / Claude 原生结构，最直接的做法就是：  
**继续沿用原本的 Messages API 写法，只把请求入口和 Key 切到 Ergouzi。**
