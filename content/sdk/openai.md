---
title: OpenAI SDK 接入
slug: /sdk/openai
group: sdk
summary: 使用 OpenAI 官方 SDK 连接 Ergouzi 的 OpenAI Compatible 入口。
order: 10
legacyPath: /legacy-static/index.html#/sdk/openai
---

## 这篇内容适合谁

如果你不是只想跑一段 `curl`，而是准备在真实项目里写代码接入，那么这篇会比 API 原始调用页更适合你。

它适合：

- 你已经在用 OpenAI 官方 SDK
- 你希望继续沿用原有调用风格
- 你只是想把 API Key 和 `baseURL` 改成 Ergouzi

这篇不讨论客户端界面操作，也不讨论 Claude / Gemini 原生字段。  
它只回答一个问题：

**怎么用官方 OpenAI SDK 接到 Ergouzi。**

如果你还没做过最小链路验证，建议先跑：

- [OpenAI Compatible 最小示例](/examples/openai-compatible)

## 开始前先准备好什么

正式写代码前，先确认你已经有：

- 一个可用的 Ergouzi API Token
- 你当前分组支持的模型名
- 你已经理解 OpenAI Compatible 入口的基础规则

如果这些还不确定，建议先看：

- [账号与 Token 基础说明](/guides/token-billing)
- [OpenAI Compatible 接入](/api/openai-compatible)

## 这条路线最关键的一点

> 你真正要改的，通常只有两样：`apiKey` 和 `baseURL`。

也就是说：

- `apiKey` 改成你的 Ergouzi Token
- `baseURL` 改成 `https://ergouzi.life`

如果你原本项目已经是基于 OpenAI 官方 SDK 来写的，大多数情况下代码结构不需要大改。

## 先准备环境变量

建议先把 Key 放到环境变量里，而不是直接写死在代码中。

```bash
export OPENAI_API_KEY="your_api_key_here"
```

后面示例里的代码，会默认从这个环境变量读取。

## Node.js 示例

### 安装

```bash
npm install openai
```

### 初始化与最小调用

```js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://ergouzi.life",
});

const response = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "请输出一句欢迎语。" }],
});

console.log(response.choices[0].message.content);
```

这段代码的重点不是调用方式本身，而是说明：

- 依然用官方 `OpenAI` 客户端
- 依然调用 `chat.completions.create`
- 只是把 `baseURL` 切到了 Ergouzi

## Python 示例

### 安装

```bash
pip install openai
```

### 初始化与最小调用

```python
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ["OPENAI_API_KEY"],
    base_url="https://ergouzi.life",
)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": "请输出一句欢迎语。"}
    ],
)

print(response.choices[0].message.content)
```

这条 Python 路线和 Node.js 是同一个思路，只是 SDK 语法不同。

## 什么时候这条路线最省事

下面这些情况，优先走 OpenAI SDK 基本都最省心：

- 你已经有 OpenAI SDK 旧项目
- 你想最小改动迁到 Ergouzi
- 你后面还要接 Responses、Images、Audio 这类能力

它的优势不在“花样更多”，而在于：

- 工具生态成熟
- 示例多
- 迁移成本低

## 最常见的几个错误

### 1. `baseURL` 写错

最常见的错误是把地址拼成别的形式。  
这条 SDK 路线里，先按旧版教程思路使用：

- `https://ergouzi.life`

不要自己先乱补别的路径，除非你已经在项目里明确验证过对应 SDK 版本需要特殊处理。

### 2. 模型名本身不可用

如果 SDK 初始化没问题，但请求还是失败，先检查：

- 当前分组是否支持这个模型
- 不是先怀疑 SDK 本身

### 3. 直接把 Key 写死进代码

这不是接不通的问题，但会让后面切换环境、共享项目或部署时变得很难维护。

更稳的方式还是：

- 本地开发用环境变量
- 项目部署时由环境注入

## 和 API 原始调用页的区别

你可以这样理解两者分工：

- [OpenAI Compatible 接入](/api/openai-compatible)：先告诉你协议、Base URL、鉴权和最小 `curl`
- [OpenAI Compatible 最小示例](/examples/openai-compatible)：先帮你确认 Key、地址和模型没有基础问题
- 这篇 SDK 页：告诉你在真实项目里怎么继续用官方 SDK

如果你只是想验证账号链路通不通，先看 API 页。  
如果你已经准备写项目代码，直接看这篇会更高效。

## 一句话总结

如果你已经在使用 OpenAI 官方 SDK，接 Ergouzi 最核心的动作通常只有一个：

**把 `baseURL` 指向 `https://ergouzi.life`，然后继续沿用原来的 SDK 调用方式。**
