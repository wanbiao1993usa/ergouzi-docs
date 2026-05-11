---
title: Claude SDK 接入
slug: /sdk/claude
group: sdk
summary: 使用 Anthropic 官方 SDK 连接 Ergouzi 的 Claude 原生入口。
order: 20
legacyPath: /legacy-static/index.html#/sdk/claude
---

## 这篇内容适合谁

如果你原本就在用 Anthropic 官方 SDK，或者你希望继续保留 Claude / Messages API 这套原生结构，这篇会更适合你。

它适合：

- 你已经有 Anthropic SDK 旧项目
- 你不想切到 OpenAI Compatible 再改一轮字段结构
- 你明确希望继续沿用 Claude 原生的 `messages.create` 方式

这篇不讨论客户端接入，也不讨论 OpenAI SDK。  
它只回答一个问题：

**怎么让官方 Anthropic SDK 接到 Ergouzi。**

## 开始前先准备好什么

正式写代码前，先确认你已经有：

- 一个可用的 Ergouzi API Token
- 一个当前分组支持的 Claude 模型名
- 你已经理解 Claude 原生入口和 OpenAI Compatible 入口不是同一套字段结构

如果这些还不确定，建议先看：

- [账号与 Token 基础说明](/guides/token-billing)
- [Claude 原生接入](/api/claude-native)

如果你还在 Claude 原生和 OpenAI Compatible 之间选路线，再补看：

- [OpenAI Compatible 接入](/api/openai-compatible)

## 这条路线最关键的一点

> Anthropic SDK 这条线里，`base_url` 也是根地址 `https://ergouzi.life`，不要自己手动拼 `/claude`。

换句话说，你真正要改的通常还是这两样：

- `apiKey`
- `baseURL`

官方 SDK 本身会继续替你处理大部分头部和原生请求结构。

## 先准备环境变量

建议先把这两个环境变量准备好：

```bash
export ANTHROPIC_API_KEY="your_api_key_here"
export ANTHROPIC_BASE_URL="https://ergouzi.life"
```

后面示例会优先读取它们。

## Node.js 示例

### 安装

```bash
npm install @anthropic-ai/sdk
```

### 初始化与最小调用

```js
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: process.env.ANTHROPIC_BASE_URL || "https://ergouzi.life",
});

const message = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1000,
  messages: [
    {
      role: "user",
      content: [{ type: "text", text: "请简要说明你接入的是哪个网关。" }],
    },
  ],
});

console.log(message.content);
```

这里的核心不是语法本身，而是说明：

- 你仍然使用官方 `Anthropic` 客户端
- 你仍然走 `messages.create`
- 只是把 `baseURL` 切到了 Ergouzi

## Python 示例

### 安装

```bash
pip install anthropic
```

### 初始化与最小调用

```python
import anthropic
import os

client = anthropic.Anthropic(
    api_key=os.environ["ANTHROPIC_API_KEY"],
    base_url=os.environ.get("ANTHROPIC_BASE_URL", "https://ergouzi.life"),
)

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1000,
    messages=[
        {
            "role": "user",
            "content": [{"type": "text", "text": "请简要说明你接入的是哪个网关。"}]
        }
    ],
)

print(message.content)
```

如果你原本项目已经是 Python + Anthropic SDK，这种迁移方式通常最省事。

## 什么时候更适合用 Claude SDK

如果你符合下面这些情况，优先继续用这条路线：

- 项目原本就按 Anthropic Messages API 组织
- 团队已经熟悉 `messages.create`
- 你不想把项目整体改写成 OpenAI 风格

这里的选择不是哪条路线“更先进”，而是哪条路线更接近你现有代码。

## 和 OpenAI SDK 路线有什么不同

你可以这样理解两者差异：

- `OpenAI SDK` 更适合统一走 OpenAI Compatible
- `Claude SDK` 更适合继续沿用 Anthropic 原生结构

如果你已经有一套 Claude 原生调用代码，继续走官方 Anthropic SDK 通常比换协议更省迁移成本。

## 最常见的几个错误

### 1. 自己手动拼 `/claude`

这是最常见的误区之一。  
这条 SDK 路线里，先按旧版文档思路使用根地址：

- `https://ergouzi.life`

不要自己先加别的路径。

### 2. 模型名本身不支持

如果 SDK 初始化没问题，但请求还是失败，先检查：

- 当前 Token 分组是否支持这个 Claude 模型

### 3. 误以为还要手动补 `anthropic-version`

一般来说，使用官方 Anthropic SDK 时，SDK 会帮你处理大部分头部。  
所以这条路线里，通常不需要你手动额外设置 `anthropic-version`。

## 和其他页面怎么配合

- [Claude 原生接入](/api/claude-native)：先把入口规则和边界看清
- [Claude 原生示例](/examples/claude)：先复制一段最小可运行代码
- [OpenAI Compatible 接入](/api/openai-compatible)：如果你还在重新判断是否坚持原生结构

## 一句话总结

如果你原本就是 Anthropic SDK 项目，接 Ergouzi 的最核心动作通常只有一个：

**把 `apiKey` 和 `baseURL` 切过去，继续沿用原本的 Claude / Messages 调用方式。**
