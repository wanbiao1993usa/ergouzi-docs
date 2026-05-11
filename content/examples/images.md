---
title: Images 示例
slug: /examples/images
group: examples
summary: 使用 OpenAI Compatible 的 Images 接口完成图像生成、编辑和变体处理。
order: 30
legacyPath: /legacy-static/index.html#/examples/images
---

## 这篇内容适合谁

如果你已经跑通了 OpenAI Compatible 基础链路，接下来想用图像能力，这篇就是最直接的起点。

它适合：

- 想生成图片
- 想基于已有图片继续编辑
- 想从原图生成多个变体

它不讨论复杂前端上传页面，只先给你接口层的核心能力和最小思路。

如果你还没跑过 OpenAI 兼容最小链路，先去看：

- [OpenAI Compatible 最小示例](/examples/openai-compatible)

## 这组接口分别是干什么的

Images 这条路线里，最常见的是三个入口：

### 1. `POST /images/generations`

用于 **从提示词直接生成新图**。

适合：

- 从零开始生成图片
- 做海报、插画、产品图等首稿
- 先验证图像能力是否可用

### 2. `POST /images/edits`

用于 **基于原图做编辑**。

适合：

- 局部修改已有图片
- 结合蒙版做替换或补全
- 在已有构图基础上微调

### 3. `POST /images/variations`

用于 **从原图派生多个变体**。

适合：

- 想保留原图大方向
- 但希望多出几个风格或细节不同的版本

## 最常见的第一步：直接生成图片

如果你第一次验证图像接口，我建议先不要一上来就做编辑。  
先用 `generations` 把最小链路接通，排错成本最低。

```bash
curl --request POST \
  --url https://ergouzi.life/images/generations \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer $ERGOUZI_API_KEY" \
  --data '{
    "model": "gpt-image-1",
    "prompt": "一张极简风格的 API 文档首页插画，米白底色，深绿色点缀",
    "size": "1024x1024"
  }'
```

这个例子的重点是：

- 用一个明确的图像模型
- 给出一段清楚的 prompt
- 先验证接口层可用

## 编辑与变体这两类接口怎么理解

很多人看到 `edits` 和 `variations` 会混淆，其实很好分：

### edits：你知道要改哪里

如果你已经有一张原图，而且你明确知道自己要替换什么、补什么、删什么，那就优先考虑 `edits`。

这类请求通常会：

- 上传原图
- 可选上传蒙版
- 用 `multipart/form-data` 发送

### variations：你只想要“类似但不同”的结果

如果你不一定知道要改哪块，只是想基于一张原图再多生成几版，那就考虑 `variations`。

它也通常是：

- 上传原图
- 用 `multipart/form-data` 请求

## 什么时候应该先停在 generations

如果你还没验证过图像链路，最稳的顺序通常是：

1. 先用 `generations` 跑通
2. 确认图像模型可用
3. 再去接 `edits`
4. 最后再考虑 `variations`

这样做的好处是：

- 一旦失败，更容易判断问题是在图像模型、认证、还是上传表单
- 不会把“图像生成问题”和“文件上传问题”混在一起排

## 最容易犯的几个错误

### 1. 一开始就做 multipart 上传调试

如果你还没确认图像接口通不通，就直接去调 `edits` 或 `variations`，排查会更麻烦。

更稳的顺序还是：

- 先跑 `generations`
- 再上文件上传

### 2. 模型本身不可用

如果请求结构没问题但还是失败，优先检查：

- 当前 Token 分组是否支持图像模型
- 不是先怀疑 prompt 写法

### 3. 把图片编辑当成普通 JSON 请求

`edits` 和 `variations` 这类接口，通常不是简单的纯 JSON。  
如果你的客户端没有现成上传能力，更建议先用服务端脚本或本地脚本做验证。

## 和其他示例页怎么配合

你可以这样理解当前几篇示例页的分工：

- [Chat Completions 示例](/examples/chat-completions)：传统消息结构
- [Responses 示例](/examples/responses)：统一输入结构
- [OpenAI SDK 接入](/sdk/openai)：准备把图像能力接进真实项目代码
- 这篇 `Images`：图像生成与处理

它们不是互相替代关系，而是覆盖不同能力面。

## 一句话总结

如果你第一次验证图像能力：  
**先用 `images/generations` 跑通，再去碰 `edits` 和 `variations`，是最省排错成本的路线。**
