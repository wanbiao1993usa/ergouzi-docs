---
title: Cherry Studio 集成
slug: /apps/cherry-studio
group: apps
summary: 在 Cherry Studio 中添加 Ergouzi 提供商、填写 API Key 和地址、拉取模型并完成对话测试。
order: 20
legacyPath: /legacy-static/index.html#/apps/cherry-studio
---

## 这篇内容适合谁

如果你平时主要通过桌面客户端来用模型，而不是自己写代码，这篇文章会很适合你。

Cherry Studio 这条路线的特点是：

- 配置入口集中在应用界面里
- 你不需要先自己拼请求
- 接通之后就能直接在聊天界面里验证

所以它很适合作为“客户端类接入”的第一篇完整教程。

## 开始前先准备好什么

在正式进入步骤之前，先确认你已经有：

- 一个可用的 Ergouzi API Token
- 一个已经安装好的 Cherry Studio

如果你还没有 Token，先去看：

- [创建 API Token](/guides/token)

如果你还没理清 Token、分组和模型支持的关系，先回看：

- [账号与 Token 基础说明](/guides/token-billing)

## 这条路线最重要的参数

在 Cherry Studio 里，你真正需要填的关键内容只有四个：

- **提供商类型**：OpenAI
- **提供商名称**：可以写 `ergouzi`
- **API 密钥**：你的 Ergouzi Token
- **API 地址**：`https://ergouzi.life`

这里要特别注意一个最常见的误区：

> Cherry Studio 里只填根地址 `https://ergouzi.life`，不要手动补 `/v1` 或 `/chat/completions`。

客户端自己会在后面拼出完整请求地址，这是正常行为。

## 配置流程概览

整条路线可以压缩成六步：

1. 进入设置
2. 添加 Ergouzi 提供商
3. 填写 Key 和 API 地址
4. 获取并添加模型
5. 回到首页切换模型
6. 发送消息测试

## 第一步：进入设置

打开 Cherry Studio 后，如果你在智能体页看到了“请启用 API 服务以使用智能体功能”之类的提示，可以直接点击 **前往设置**。

如果没有这条提示，也可以直接点击右上角齿轮进入设置。

![Cherry Studio 智能体页中的前往设置按钮](/assets/cherry-studio/agent-settings-entry.webp)

## 第二步：添加 Ergouzi 提供商

进入设置后，在左侧选择 **模型服务**。

然后在模型平台列表底部点击 **添加**，开始新建一个提供商。

在“添加提供商”的弹窗里：

- 提供商名称填写 `ergouzi`
- 提供商类型选择 `OpenAI`

这样做的目的，是让 Cherry Studio 以后把 Ergouzi 当作一套 OpenAI Compatible 服务来管理。

![Cherry Studio 模型服务页底部的添加按钮](/assets/cherry-studio/api-server-add-entry.webp)

![Cherry Studio 添加提供商弹窗，名称填写 ergouzi，类型选择 OpenAI](/assets/cherry-studio/add-provider-dialog.webp)

## 第三步：填写 API Key 和 API 地址

创建完成后，在左侧选中刚才新建的 **ergouzi** 提供商。

然后填写：

- **API 密钥**：你的 Ergouzi API Token
- **API 地址**：`https://ergouzi.life`

还要注意两件事：

- 右上角开关要保持启用状态
- 看到地址预览变成 `https://ergouzi.life/v1/chat/completions` 是正常的

填完以后，点击 **获取模型列表**。

![Cherry Studio 中 ergouzi 提供商的 API 密钥和 API 地址配置](/assets/cherry-studio/provider-config.webp)

## 第四步：获取并添加模型

模型列表弹出后，找到你要使用的模型，然后点击右侧的 **+** 加入当前提供商。

建议第一轮先这样选：

- 普通聊天：先加一个文本模型，例如 `gpt-5.4`
- 图像能力：如果你需要画图，再加 `gpt-image-2`

不要一开始就把一堆模型全加进来。  
先让最常用的文本模型跑通，排错成本最低。

![Cherry Studio 模型列表弹窗中模型右侧的加号](/assets/cherry-studio/model-picker-add.webp)

添加完成后，回到提供商详情页，模型区域应该能看到你刚加入的模型列表。

这一步的意义是确认：模型已经真正写入 Cherry Studio，而不是只是弹窗里看见了它。

![Cherry Studio ergouzi 提供商下已添加的模型列表](/assets/cherry-studio/model-list-result.webp)

## 第五步：回到首页切换模型

回到首页后，点击聊天顶部当前显示的模型名称，打开模型选择器。

如果此时你看到默认是图片模型，比如 `gpt-image-2`，而你只是想先做对话测试，那就先切回文本模型。

最稳的做法是：

- 回到首页
- 打开模型选择器
- 找到 `ergouzi` 分组
- 选择 `gpt-5.4` 这类文本模型

![Cherry Studio 首页顶部的模型选择器](/assets/cherry-studio/home-model-selected.webp)

![Cherry Studio 模型选择器中 ergouzi 分组的模型](/assets/cherry-studio/model-switcher.webp)

## 第六步：发送一条消息验证

最后一步很简单：在输入框里发一条最普通的消息，比如：

- 你好
- 用一句话介绍自己
- 介绍一下 Ergouzi API

如果模型能正常回复，就说明下面几项都已经生效：

- API Key 正确
- API 地址正确
- 模型添加成功
- 当前模型切换成功

![Cherry Studio 使用 ergouzi 模型正常回复测试消息](/assets/cherry-studio/chat-test-success.webp)

## Cherry Studio 这条路线最常见的错误

### 获取模型列表后是空的

优先检查：

- API 地址是不是只填了 `https://ergouzi.life`
- API Key 是否复制完整

### 模型弹窗里能看到模型，但首页选不到

通常说明你只是看到了列表，但没有真正点模型右侧的 **+** 把它加入当前提供商。

### 普通聊天没有回复

先确认你当前选中的不是图片模型。  
第一次验证聊天时，建议用 `gpt-5.4` 这样的文本模型，不要拿 `gpt-image-2` 做对话测试。

### 对话正常，但图像功能不可用

说明文本模型接通了，但你还没有把图像模型单独加到 `ergouzi` 提供商下，或者没有在图像功能里切换到那个模型。

### 请求报 401 / 403

最常见的原因是：

- API Key 无效
- Key 被禁用
- 当前分组不支持你要调用的模型

## 一句话总结

Cherry Studio 这条路线的本质是：

**添加一个 OpenAI 类型的 Ergouzi 提供商 -> 填根地址和 Key -> 拉模型 -> 切模型 -> 发消息验证。**

只要你先用文本模型把对话跑通，后面再补图片等能力会简单很多。

## 下一步建议

- 如果你只是想先验证接口本身，再回去看 [OpenAI Compatible 最小示例](/examples/openai-compatible)
- 如果你准备继续用图片能力，再去看 [Images 示例](/examples/images)
- 如果你要把同一套 Key 和模型接到别的工具，再回到 [客户端与工具](/apps)
