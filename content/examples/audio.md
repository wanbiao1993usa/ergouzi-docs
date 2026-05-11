---
title: Audio 示例
slug: /examples/audio
group: examples
summary: 使用 OpenAI Compatible 的 Audio 接口完成语音转文字和文字转语音。
order: 40
legacyPath: /legacy-static/index.html#/examples/audio
---

## 这篇内容适合谁

如果你已经把文本和图像类接口跑通，接下来想处理音频能力，这篇就是最直接的起点。

它适合两类常见场景：

- **语音转文字**：把音频文件转成文本
- **文字转语音**：把文本合成语音文件

你可以把它理解成：

**Audio 这组接口主要解决输入和输出里的“声音”问题。**

如果你还没跑过 OpenAI 兼容最小链路，先去看：

- [OpenAI Compatible 最小示例](/examples/openai-compatible)

## 这组接口主要分成两条路线

### 1. `POST /audio/transcriptions`

用于 **语音转文字**。

适合：

- 把录音转成文字
- 做字幕、会议记录、语音笔记
- 先验证上传音频文件链路

### 2. `POST /audio/speech`

用于 **文字转语音**。

适合：

- 把一段文本合成 mp3
- 做语音播报
- 做简单的 TTS 输出

## 语音转文字示例

如果你手头已经有音频文件，最小验证方式通常是：

```bash
curl --request POST \
  --url https://ergouzi.life/audio/transcriptions \
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \
  --header "Content-Type: multipart/form-data" \
  --form file=@/path/to/audio.mp3 \
  --form model=whisper-1
```

这条路线的关键点是：

- 不是纯 JSON 请求
- 需要上传音频文件
- 通常用 `multipart/form-data`

如果这一步成功，说明你已经打通了音频上传和识别链路。

## 文字转语音示例

如果你想把一段文本直接生成音频文件，可以这样做：

```bash
curl --request POST \
  --url https://ergouzi.life/audio/speech \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \
  --data '{
    "model": "tts-1",
    "voice": "alloy",
    "input": "欢迎使用 Ergouzi API 文档站。"
  }' \
  --output speech.mp3
```

这个例子的重点是：

- 请求体还是普通 JSON
- 输出结果是音频文件
- 最终会写到本地 `speech.mp3`

## 什么时候先做 transcription，什么时候先做 speech

更稳的理解方式是：

### 先做 transcription

如果你的目标是验证：

- 文件上传链路
- 语音识别可用性
- 音频输入处理

那就先从 `transcriptions` 开始。

### 先做 speech

如果你的目标是验证：

- TTS 输出是否可用
- 模型能否生成语音文件
- 你的程序能否接收二进制音频输出

那就先从 `speech` 开始。

## 最容易犯的几个错误

### 1. 把 transcription 当成普通 JSON 请求

这类接口通常不是简单的 JSON。  
如果你没有按文件上传的方式发请求，往往会直接失败。

### 2. 还没确认链路，就先加复杂业务逻辑

更稳的排查顺序通常是：

1. 先跑最小示例
2. 确认接口可用
3. 再接业务逻辑

### 3. 模型可用性没先确认

如果请求结构看起来没问题，但还是失败，先检查：

- 当前 Token 分组是否支持相关音频模型

不要一开始就把问题归到代码细节上。

## 和其他示例页的关系

你可以这样理解当前几篇示例页的分工：

- [Chat Completions 示例](/examples/chat-completions)：传统聊天与多模态消息结构
- [Responses 示例](/examples/responses)：统一输入结构
- [Images 示例](/examples/images)：图像生成与处理
- [OpenAI SDK 接入](/sdk/openai)：准备把语音能力接进真实项目代码
- 这篇 `Audio`：语音识别与语音合成

它们共同组成 OpenAI Compatible 这条线最常见的能力面。

## 一句话总结

如果你第一次验证音频能力：  
**语音转文字先看 `transcriptions`，文字转语音先看 `speech`，先跑最小示例再接业务，是最稳的顺序。**
