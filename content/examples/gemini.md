---
title: Gemini 原生示例
slug: /examples/gemini
group: examples
summary: 使用 Gemini 原生 generateContent、streamGenerateContent 和 Python SDK 快速验证原生入口是否可用。
order: 70
legacyPath: /legacy-static/index.html#/examples/gemini
---

## 这篇内容适合谁

如果你已经决定不走 OpenAI Compatible，而是继续沿用 Gemini 原生请求结构，这篇就是最直接的示例页。

它适合：

- 已有 Gemini 原生代码的人
- 想直接验证 `generateContent` 是否可用的人
- 准备继续沿用 Google GenAI SDK 的人

## 非流式 `generateContent`

```bash
curl --request POST \
  --url "https://ergouzi.life/v1beta/models/gemini-2.5-flash:generateContent" \
  --header "Content-Type: application/json" \
  --header "x-goog-api-key: $ERGOUZI_API_KEY" \
  --data '{
    "contents": [
      {
        "role": "user",
        "parts": [{"text": "Why should I use Ergouzi API?"}]
      }
    ]
  }'
```

这段最适合先验证：

- 原生 Gemini 路由是否通
- `x-goog-api-key` 是否正确
- 当前 Token 分组是否支持目标 Gemini 模型

## 流式 `streamGenerateContent`

```bash
curl --request POST \
  --url "https://ergouzi.life/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse" \
  --header "Content-Type: application/json" \
  --header "x-goog-api-key: $ERGOUZI_API_KEY" \
  --data '{
    "contents": [
      {
        "role": "user",
        "parts": [{"text": "给我一个 5 点的集成建议清单。"}]
      }
    ]
  }'
```

如果你后面要做逐步输出、长文本流式响应或前端实时展示，通常就会继续往这条路走。

## Python SDK 示例

```python
from google import genai
from google.genai import types

client = genai.Client(
    api_key="your_api_key_here",
    http_options=types.HttpOptions(base_url="https://ergouzi.life"),
)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="hi~",
)

print(response.text)
```

这条示例的重点不是“写法多炫”，而是继续沿用 Google GenAI SDK，只把请求入口切到 Ergouzi。

## 最容易踩的坑

### 1. 路由走 Gemini，结构却还按 OpenAI 写

如果你这里走的是 Gemini 原生，就按 `contents` / `parts` 这一套写。

别一边用 Gemini 原生路径，一边还在想 `messages`。

### 2. 忘了 `x-goog-api-key`

这条线路的常见鉴权头是：

- `x-goog-api-key`

不是 Bearer 头。

### 3. 拿非 Gemini 模型来测

Gemini 原生入口不是通用模型网关。

如果你这里写的是 OpenAI 或 Claude 模型名，那方向本身就错了。

## 和其他页面怎么配合

- [Gemini 原生接入](/api/gemini-native)：先看规则和边界
- [Gemini SDK 接入](/sdk/gemini)：如果你要把它放进正式项目代码
- [OpenAI Compatible 接入](/api/openai-compatible)：如果你还没决定是否坚持原生结构

## 一句话总结

这篇适合“已经决定走 Gemini 原生”的人，  
**目标不是讲理论，而是让你用几段最小示例把原生入口尽快验证掉。**
