---
title: Gemini SDK 接入
slug: /sdk/gemini
group: sdk
summary: 使用 Google GenAI 官方 SDK 连接 Ergouzi 的 Gemini 原生入口。
order: 30
legacyPath: /legacy-static/index.html#/sdk/gemini
---

## 这篇内容适合谁

如果你原本就在使用 Google GenAI 官方 SDK，或者你希望继续保持 Gemini 原生的调用方式，这篇更适合你。

它适合：

- 你已经有 Gemini SDK 旧项目
- 你不想改成 OpenAI Compatible 结构
- 你希望继续沿用 Google GenAI 的原生调用体验

这篇不讨论 OpenAI SDK，也不讨论 Claude 原生。  
它只回答一个问题：

**怎么把 Gemini 官方 SDK 接到 Ergouzi。**

## 先强调一个边界

> 这条页面只适用于 Gemini 模型。

也就是说：

- 你不能拿 Gemini SDK 去请求 OpenAI 模型
- 也不能拿 Gemini SDK 去请求 Claude 模型

如果你想统一用一套入口覆盖更多模型，那应该回去看：

- [OpenAI Compatible 接入](/api/openai-compatible)

## 开始前先准备好什么

正式写代码前，先确认你已经有：

- 一个可用的 Ergouzi API Token
- 一个当前分组支持的 Gemini 模型
- 你明确希望继续使用 Gemini 原生 SDK

如果你还不确定 Token、分组和模型支持的关系，建议先看：

- [账号与 Token 基础说明](/guides/token-billing)
- [Gemini 原生接入](/api/gemini-native)

## 这条路线最关键的一点

> Gemini SDK 这里也使用根地址 `https://ergouzi.life`，不要自己手动拼 `/gemini`。

也就是说，在这条 SDK 路线上，你真正需要关注的核心参数仍然是：

- `api_key`
- `base_url`

只是它们要按 Google GenAI SDK 自己的初始化方式来写。

## 先准备环境变量

建议先准备环境变量：

```bash
export GEMINI_API_KEY="your_api_key_here"
```

后面的代码示例会直接读取它。

## Python 示例

### 安装

```bash
pip install -U google-genai
```

### 初始化与最小调用

```python
from google import genai
from google.genai import types
import os

client = genai.Client(
    api_key=os.environ["GEMINI_API_KEY"],
    http_options=types.HttpOptions(base_url="https://ergouzi.life"),
)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="请用一句话介绍 Ergouzi API。",
)

print(response.text)
```

这段代码的关键不是语法，而是说明：

- 你仍然用官方 `google-genai`
- 仍然走 Gemini 原生的调用结构
- 只是把 `base_url` 改成了 Ergouzi

## Node.js 示例

### 安装

```bash
npm install @google/genai
```

### 初始化与最小调用

```js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    baseUrl: "https://ergouzi.life",
  },
});

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "请用一句话介绍 Ergouzi API。",
});

console.log(response.text);
```

如果你原本项目就是 Node + Gemini SDK，这通常就是最小迁移方式。

## 什么时候更适合继续用 Gemini SDK

下面这些情况，更适合继续走这条路线：

- 你已经有一套 Gemini 原生 SDK 代码
- 你明确要保持 `generateContent` 这一类调用方式
- 团队已经熟悉 Google GenAI SDK

在这种情况下，继续沿用官方 SDK 通常比换协议更省迁移成本。

## 和 OpenAI / Claude SDK 的区别

你可以这样理解三条 SDK 路线：

- `OpenAI SDK`：更适合走统一的 OpenAI Compatible
- `Claude SDK`：更适合继续沿用 Anthropic Messages 结构
- `Gemini SDK`：更适合继续沿用 Google GenAI 的原生方式

所以核心不是谁更先进，而是谁更贴近你现有项目。

## 最常见的几个错误

### 1. 自己手动拼 `/gemini`

这是 Gemini 这条线里最常见的误区之一。  
先按旧版文档思路使用根地址：

- `https://ergouzi.life`

不要自己额外拼新的路径。

### 2. 模型名本身不支持

如果 SDK 初始化没问题，但调用失败，优先检查：

- 当前 Token 分组是否支持这个 Gemini 模型

### 3. 拿 Gemini SDK 去请求别的模型体系

Gemini SDK 只适合 Gemini 原生调用。  
如果你实际想接的是 OpenAI 或 Claude 模型，就不要继续在这条路线上排错。

## 和其他页面怎么配合

- [Gemini 原生接入](/api/gemini-native)：先把路由、头部和边界看清
- [Gemini 原生示例](/examples/gemini)：先复制一段最小可运行示例
- [OpenAI Compatible 接入](/api/openai-compatible)：如果你还在判断是否继续坚持 Gemini 原生结构

## 一句话总结

如果你原本就是 Google GenAI SDK 项目，接 Ergouzi 的最核心动作通常只有一个：

**把 `base_url` 指向 `https://ergouzi.life`，继续沿用原本的 Gemini 原生 SDK 调用方式。**
