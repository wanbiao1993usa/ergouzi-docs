---
title: OpenAI Compatible 最小示例
slug: /examples/openai-compatible
group: examples
summary: 用一段最小 curl 先验证 OpenAI Compatible 入口、Key 和模型是否跑通，再决定往 Responses、Chat Completions 或媒体能力继续扩展。
order: 15
legacyPath: /legacy-static/index.html#/examples/openai-compatible
---

## 这篇内容适合谁

如果你现在的目标不是“选哪种最佳接口风格”，而是先确认：

- API Key 是否可用
- Base URL 是否填对
- 最小请求是否能返回

那这篇就是最短路径。

它最适合这两类人：

- 第一次接入，想先做最小验证
- 后面准备接客户端或 SDK，但不想一上来就被复杂配置干扰

如果你还没理清 Token、分组和模型支持关系，先回看：

- [账号与 Token 基础说明](/guides/token-billing)

## 最小示例

```bash
curl --request POST \
  --url https://ergouzi.life/chat/completions \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \
  --data '{
    "model": "gpt-4o-mini",
    "messages": [
      { "role": "user", "content": "hi" }
    ]
  }'
```

## 这段请求主要验证什么

别把它看成“功能完整的示例”，它的作用更像一块试金石。

它主要验证：

- OpenAI Compatible 根地址是否写对
- Bearer 鉴权是否正确
- 你当前 Token 分组是否支持这个模型

如果这段都跑不通，就别急着先怪客户端或 SDK。

## 跑通后下一步看哪里

如果最小请求已经成功，后面就不要停在这里了，可以按你的真实需求往下走：

- [Responses 示例](/examples/responses)：适合新项目、统一输入结构
- [Chat Completions 示例](/examples/chat-completions)：适合已有 OpenAI `messages` 结构的项目
- [Images 示例](/examples/images)：图像生成、编辑、变体
- [Audio 示例](/examples/audio)：语音转文字、文字转语音
- [OpenAI SDK 接入](/sdk/openai)：适合已经准备把它写进真实项目代码

## 和 API 说明页的区别

- [OpenAI Compatible 接入](/api/openai-compatible)：解释“为什么默认推荐走这条路线”
- 这篇示例页：只负责给你一个**最小可运行请求**

也就是说：

- API 页负责讲规则和边界
- 示例页负责给你最快的验证入口

## 常见错误

### 1. 看到最小示例能跑，就以为后面所有客户端都会自动正常

不会。

这只能说明接口本身通了，不能说明每个客户端字段都配对了。

### 2. 一开始就挑复杂模型或复杂功能做首测

更稳的方式是：

1. 先跑这段最小请求
2. 再进 Responses 或 Chat Completions
3. 最后再接图片、音频或客户端

## 一句话总结

这篇不是为了长期停留，而是为了帮你先把最小链路验证掉。  
**一旦跑通，就应该立刻转进更具体的示例页。**
