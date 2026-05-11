---
title: Chat Completions 示例
slug: /examples/chat-completions
group: examples
summary: 使用传统 OpenAI `messages` 结构发起聊天、多模态输入和工具调用请求。
order: 20
legacyPath: /legacy-static/index.html#/examples/chat-completions
---

## 这篇内容适合谁

如果你已经有一套基于 OpenAI `messages` 结构的旧代码，或者你就是想最快拿到一个最熟悉的聊天式请求示例，这篇会比 Responses 更直接。

它适合：

- 已经在用传统 OpenAI 聊天接口的人
- 想保持 `messages` 心智模型不变的人
- 想快速验证文本、多模态输入和 tools 调用的人

你可以把它理解成：

**这是最传统、最常见、也最容易直接沿用的聊天接口写法。**

## 这条路线的基础信息

在正式看示例前，先记住这三个点：

### Endpoint

`POST /chat/completions`

### Base URL

`https://ergouzi.life`

### 鉴权方式

`Authorization: Bearer <API_KEY>`

如果你连这一层都还没确认过，建议先看：

- [OpenAI Compatible 接入](/api/openai-compatible)
- [OpenAI Compatible 最小示例](/examples/openai-compatible)

## 最小文本请求示例

下面这段就是最常见的最小文本调用：

```bash
curl --request POST \
  --url https://ergouzi.life/chat/completions \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \
  --data '{
    "model": "gpt-4o-mini",
    "messages": [
      {"role": "user", "content": "写一句简短的欢迎语。"}
    ]
  }'
```

这类写法的特点是：

- 非常直白
- 资料多
- 迁移旧项目最省事

如果你只是想先确认“聊天接口通不通”，这通常是最容易上手的起点。

## 多模态输入示例

如果你要让模型同时理解文本和图片，也可以继续沿用 `messages` 风格，只是把 `content` 改成数组结构：

```bash
curl --request POST \
  --url https://ergouzi.life/chat/completions \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \
  --data '{
    "model": "gpt-4.1",
    "messages": [
      {
        "role": "user",
        "content": [
          {"type": "text", "text": "请描述这张图片。"},
          {
            "type": "image_url",
            "image_url": {
              "url": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d"
            }
          }
        ]
      }
    ]
  }'
```

这个例子说明了一件事：

即使你不切到 Responses，也一样可以在 `chat.completions` 路线上处理多模态输入。

所以选择哪条接口，不是“哪条功能更多”，而是：

- 你更习惯 `messages`
- 还是更想统一为 `input`

## Tools 调用示例

如果你需要让模型按函数结构输出工具调用请求，也可以继续用 `chat.completions`：

```json
{
  "model": "gpt-4.1",
  "messages": [
    { "role": "user", "content": "查询上海当前天气" }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_current_weather",
        "description": "获取给定城市的天气",
        "parameters": {
          "type": "object",
          "properties": {
            "city": { "type": "string" }
          },
          "required": ["city"]
        }
      }
    }
  ],
  "tool_choice": "auto"
}
```

这里的重点不是工具本身，而是：

- `chat.completions` 完全可以承载函数式工具调用
- 所以如果你旧项目已经在走这条路线，没有必要为了 tools 强行重写成另一套结构

## 什么时候更适合继续用 Chat Completions

如果你符合下面这些情况，这条路线通常更合适：

- 你已经有现成的 `messages` 代码
- 你不想重构旧项目输入结构
- 你只是想快速做传统聊天、多模态或工具调用
- 你的团队已经非常熟悉 `chat.completions`

## 什么时候更适合看 Responses

如果你满足下面这些情况，就可以考虑去看 Responses：

- 这是一个新项目
- 你想统一输入结构
- 你后面会频繁组合文本、图片和更多输入类型
- 你不想未来再从 `messages` 迁到 `input`

也就是说：

- `Chat Completions`：更适合沿用旧风格
- `Responses`：更适合新项目和统一结构

如果你准备把这条路线写进真实项目代码，再继续看：

- [OpenAI SDK 接入](/sdk/openai)

## 最容易犯的几个错误

### 1. 请求能发，但模型不支持

这类问题非常常见。  
如果结构没问题但请求失败，优先检查：

- 当前 Token 分组是否支持这个模型

### 2. 混淆 `messages` 和 `input`

这篇讲的是 `chat.completions`。  
如果你已经决定走这条路线，就按 `messages` 来写，不要把 Responses 的 `input` 结构混进来。

### 3. 一开始就把文本、多模态、tools 一起上

更稳的排查顺序通常是：

1. 先跑最小文本请求
2. 成功后再加图片输入
3. 最后再引入 tools

这样一旦失败，更容易判断到底是哪一层出了问题。

## 一句话总结

如果你已经有一套传统 OpenAI `messages` 风格代码，或者你只是想最快复用熟悉的聊天请求结构：  
**继续使用 `chat.completions`，通常是最直接、最省迁移成本的方案。**
