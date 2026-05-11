---
title: Responses 示例
slug: /examples/responses
group: examples
summary: 使用统一的 Responses 接口组织文本与多模态输入，适合新项目和更复杂的输入结构。
order: 10
legacyPath: /legacy-static/index.html#/examples/responses
---

## 这篇内容适合谁

如果你已经知道 OpenAI Compatible 能接通了，但你不想继续只围着 `chat.completions` 写代码，这篇就是给你的。

Responses 这条路线更适合：

- 新项目
- 更统一的输入结构
- 后续准备引入多模态输入
- 不想把文本、图片和工具请求拆成太多不同接口风格

你可以把它理解成：  
**它不是更复杂，而是更统一。**

如果你还没做过最小验证，先跑：

- [OpenAI Compatible 最小示例](/examples/openai-compatible)

## Responses 和 Chat Completions 有什么区别

最核心的差异只有一条：

- `chat.completions` 用的是 `messages`
- `responses` 更强调统一的 `input`

也就是说，如果你原本项目已经是一套标准 OpenAI `messages` 结构，那么继续用 `chat.completions` 没问题。  
但如果你在做新项目，或者你预期后面会更频繁地混合文本、图片和更多输入类型，那 Responses 通常更顺手。

## 最小文本请求示例

下面这段就是最小可运行的文本请求：

```bash
curl --request POST \
  --url https://ergouzi.life/responses \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \
  --data '{
    "model": "gpt-4.1",
    "input": "请用三句话概括 Ergouzi API 的定位。"
  }'
```

这个例子的用途很明确：

- 先验证 Responses 入口可用
- 不需要多轮上下文
- 不需要图片
- 先确认 Token、模型和请求结构都没问题

## 图像输入示例

如果你准备让模型同时理解文本和图片，可以直接把输入组织成下面这种结构：

```bash
curl --request POST \
  --url https://ergouzi.life/responses \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \
  --data '{
    "model": "gpt-4.1",
    "input": [
      {
        "role": "user",
        "content": [
          { "type": "input_text", "text": "请描述图中的主要内容。" },
          {
            "type": "input_image",
            "image_url": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d"
          }
        ]
      }
    ]
  }'
```

这个例子体现的是 Responses 的一个典型优势：

- 你不需要为了“图片输入”再换一整套心智模型
- 只是把不同输入类型统一塞进 `input` 结构里

## 什么时候更适合用 Responses

如果你满足下面任意一种情况，优先考虑 Responses：

- 这是一个新项目，没有历史 `messages` 包袱
- 你希望输入结构尽量统一
- 你后面会频繁加入图片等多模态内容
- 你不想未来再从 `chat.completions` 迁一次结构

## 什么时候没必要急着换

如果你已经有一套稳定的 `chat.completions` 代码，而且当前项目没有多模态压力，那就没必要为了“看起来更新”强行切到 Responses。

这两条路线不是谁先进谁落后，而是：

- `chat.completions`：适合沿用旧代码和传统消息风格
- `responses`：适合新项目和统一输入结构

## 最容易犯的几个错误

### 1. 还没确认基础链路，就先上复杂多模态输入

更稳的顺序是：

1. 先跑最小文本请求
2. 确认成功
3. 再加图片输入

这样一旦失败，排查范围更清楚。

### 2. 模型和分组不匹配

如果请求结构看起来没问题，但调用还是失败，优先检查：

- 你当前 Token 分组是否支持这个模型

这类问题比“JSON 写错”更常见。

### 3. 把 Responses 和 Chat Completions 混成同一种写法

既然你选了 Responses，就应该按它自己的 `input` 结构来写。  
不要一边走 Responses 路线，一边又硬套旧的 `messages` 心智，代码会越来越乱。

## 下一步可以看哪里

如果你已经跑通这篇的示例，下一步可以继续按场景走：

- 想看传统消息结构：去看 [Chat Completions 示例](/examples/chat-completions)
- 想看更完整的 OpenAI Compatible 接入：去看 [OpenAI Compatible 接入](/api/openai-compatible)
- 想看图片能力：去看 [Images 示例](/examples/images)
- 想把它写进项目代码里：去看 [OpenAI SDK 接入](/sdk/openai)

## 一句话总结

如果你在做新项目，并且希望以后更自然地组织文本、多模态和复杂输入：  
**Responses 通常会比传统 `chat.completions` 更适合作为长期接口。**
