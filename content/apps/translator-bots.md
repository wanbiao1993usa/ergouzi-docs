---
title: 翻译工具与机器人
slug: /apps/translator-bots
group: apps
summary: FluentRead、LunaTranslator、LangBot 这类翻译工具与机器人平台的接入方式，重点看根地址、模型拉取和 embedding 配置。
order: 60
legacyPath: /legacy-static/index.html#/apps/translator-bots
---

## 这篇内容适合谁

如果你要接的不是 IDE、聊天客户端或终端助手，而是：

- 浏览器翻译插件
- GalGame 翻译器
- IM 机器人 / 机器人平台

那这篇就是对应入口。

这一类工具的共同点是：

- 很多支持一键导入，也支持手动填
- 大多数底层还是走 OpenAI Compatible
- LangBot 这类平台还会多出 embedding、知识库、流水线这类额外配置

## FluentRead

FluentRead 既支持控制台一键导入，也支持手动填写。

手动模式下，优先记住一件事：  
它要的通常是**站点根域名**，不是额外拼过路径的 SDK 地址。

常见填写方式如下：

| 项目 | 建议填写 |
| --- | --- |
| 翻译服务 | `NewAPI` 或你的自定义服务名 |
| 访问令牌 | 你的 Ergouzi API Key |
| NewAPI 接口 | `https://ergouzi.life` |
| 模型 | 从列表选择，或手动输入模型名 |

如果你维护控制台侧的一键导入能力，旧教程里常见的映射写法是：

```json
{ "流畅阅读": "fluentread" }
```

但就接入本身来说，关键仍然是根地址和 Key。

## LunaTranslator

LunaTranslator 的关键不是字段多，而是步骤别乱。

更稳的顺序是：

1. 先复制一枚可用的 API Key
2. 进入设置 -> 翻译设置 -> 大模型
3. 基于“大模型通用接口”模板新增接口
4. 把 API 地址改成 `https://ergouzi.life`
5. 填入 API Key
6. 刷新模型列表
7. 选中模型并启用接口

你可以把它理解成两层动作：

- 第一层：把接口接通
- 第二层：把具体模型拉到本地配置里

很多人不是挂在“Key 不对”，而是挂在“接口加了但没刷新模型列表”。

## LangBot

LangBot 更像机器人开发平台，而不是单纯的聊天壳。

除了聊天模型，你还可能会接：

- embedding 模型
- 知识库
- 流水线
- 飞书、Telegram、Discord 之类的平台机器人

常见填写方式如下：

| 项目 | 建议填写 |
| --- | --- |
| 模型供应商 | `NewAPI` 或自定义 OpenAI 兼容供应商 |
| API 地址 | `https://ergouzi.life` |
| API Key | 你的 Ergouzi API Key |
| 接入顺序 | 先加模型，再挂流水线，最后用会话调试或机器人对话验证 |

### 如果你要做知识库

聊天模型接通只是第一步。

如果你还要做知识库，一般还要再补一件事：

- 额外添加 embedding 模型
- 在新建知识库时选中该向量模型

也就是说，LangBot 这类平台最容易被忽略的，不是聊天模型，而是**embedding 这一层**。

## 推荐做法

这一类工具最怕“填完就以为结束了”。

更稳的顺序是：

1. 先把最小接口接通
2. 再刷新模型列表
3. 再启用实际使用的模型
4. 最后才处理知识库、机器人平台或更复杂的流水线

这样一旦失败，你能很快判断问题是在：

- 根地址
- API Key
- 模型列表拉取
- embedding / 流水线这类高级配置

## 常见错误

### 1. 把根地址写成带多余路径的地址

这类工具很多不是直接让你填 SDK `base_url`，而是让你填一个“服务地址”或“站点地址”。

这时优先先试：

`https://ergouzi.life`

别先自己脑补拼 `/v1/chat/completions`。

### 2. 聊天能跑，知识库不能跑

这种情况通常不是聊天模型坏了，而是 embedding 模型没配、没选，或者知识库流程没挂上对应向量模型。

### 3. 接口加上了，但模型列表没刷新

特别是 LunaTranslator、LangBot 这类工具，很多时候还得显式刷新模型列表或重新选择模型，不是填完地址就自动生效。

## 和其他页面怎么配合

- [OpenAI Compatible 接入](/api/openai-compatible)：先确认接口规则
- [聊天客户端接入](/apps/chat-clients)：如果你其实接的是聊天壳
- [OpenAI Compatible 最小示例](/examples/openai-compatible)：如果你想先用最小请求把接口本身跑通

## 一句话总结

翻译工具和机器人平台这条线，最重要的不是界面长什么样，  
而是先把 **OpenAI Compatible 根地址 + Key + 模型列表** 跑通，再处理 embedding 和平台侧流程。
