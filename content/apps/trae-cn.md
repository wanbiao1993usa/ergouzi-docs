---
title: Trae CN 配置
slug: /apps/trae-cn
group: apps
summary: 在 Trae CN / SOLO Coder 中添加自定义模型，填写模型 ID、API Key 和完整请求地址。
order: 30
legacyPath: /legacy-static/index.html#/apps/trae-cn
---

## 这篇内容适合谁

如果你平时主要在 Trae CN 或 SOLO Coder 里写代码，这篇就是你对应的接入路线。

它和 Cherry Studio 最大的不同点不在“界面长什么样”，而在于：

- Trae CN 这里需要填写的是 **完整请求地址**
- 不是只填一个根域名 Base URL

这也是这条路线最容易填错的地方。

## 开始前先准备好

正式配置前，先确认你已经有：

- 一个可用的 Ergouzi API Token
- 一个当前分组支持的模型名，例如 `gpt-5.4` 或 `gpt-5.5`

如果你还没创建 Token，先去看：

- [创建 API Token](/guides/token)

如果你不确定某个模型当前分组能不能用，先去看：

- [账号与 Token 基础说明](/guides/token-billing)

## 这条路线最重要的参数

Trae CN 里最关键的几项参数如下：

- **服务商**：OpenRouter
- **模型**：自定义模型
- **模型 ID**：你真正要调用的模型名，例如 `gpt-5.4`
- **API 密钥**：你的 Ergouzi Token
- **自定义请求地址**：`https://ergouzi.life/v1/chat/completions`

> 这里填的是完整的 Chat Completions 地址，不是普通根地址。

## 配置流程概览

这条路线可以压缩成四步：

1. 打开设置
2. 进入模型管理并添加模型
3. 填写模型 ID、Token 和完整请求地址
4. 确认模型启用并做测试

## 第一步：打开设置

打开 Trae CN 后，在顶部工具栏找到齿轮图标，点击进入设置页面。

![Trae CN 顶部工具栏中的设置按钮](/assets/trae-cn/open-settings.webp)

## 第二步：进入模型管理并添加模型

进入设置后，在左侧点击 **模型**。  
右侧会出现模型管理区域，然后点击上方的 **添加模型**。

这一步的目标，是新建一个完全由你自己填写参数的自定义模型条目。

![Trae CN 设置页中的模型管理与添加模型按钮](/assets/trae-cn/model-management.webp)

## 第三步：填写模型 ID、API Key 和请求地址

在“添加模型”的弹窗中，按下面的方式填写：

- **服务商**：选择 `OpenRouter`
- **模型**：选择 `自定义模型`
- **模型 ID**：填写你要用的模型名，例如 `gpt-5.4`
- **API 密钥**：填写你的 Ergouzi Token
- **自定义请求地址**：填写 `https://ergouzi.life/v1/chat/completions`

这里再强调一次：

- 不是填 `https://ergouzi.life`
- 也不是填 `/v1`
- 而是直接填完整的 Chat Completions 地址

![Trae CN 添加模型弹窗中的模型 ID、API 密钥和自定义请求地址](/assets/trae-cn/add-model-dialog.webp)

## 第四步：确认模型启用

点击 **添加模型** 后，回到模型管理页。

你需要确认两件事：

1. 新模型是否已经出现在“自定义”分组下
2. 它右侧的启用开关是否处于打开状态

确认完成后，再回到 SOLO Coder 或对话区域，选择这个模型做一次简单测试。

## 这条路线最常见的错误

### 模型添加失败

优先检查：

- 自定义请求地址是不是填成了 `https://ergouzi.life/v1/chat/completions`
- 而不是只填根域名

### 请求报 401 / 403

通常说明：

- Token 无效
- Token 复制不完整
- 当前分组没有这个模型权限

### 模型名报错

先去模型广场确认你当前分组是否支持这个模型，再把模型 ID 改成可用的名字。

### 设置里没有“自定义请求地址”

这通常说明：

- 当前 Trae CN 版本不一致
- 或者你进入的不是正确的配置入口

这时先考虑升级客户端，再排查更旧的兼容方案。

## 一句话总结

Trae CN 这条路线的关键，不是“服务商选什么”，而是：

**你有没有把模型 ID、Token 和完整的 Chat Completions 地址正确填进去。**

只要这三项正确，大多数情况下这条链路就能接通。

## 下一步建议

- 如果你想先单独验证接口本身，去看 [OpenAI Compatible 最小示例](/examples/openai-compatible)
- 如果你后面还要在 IDE 或插件里接类似能力，继续看 [编辑器与插件](/apps/editor-tools)
