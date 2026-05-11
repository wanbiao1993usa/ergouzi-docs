---
title: CC Switch 配置 Codex
slug: /apps/cc-switch
group: apps
summary: 先用 CC Switch 跑通 Codex 这条最短链路，再把同样的配置思路迁移到 Claude Code 和别的应用。
order: 10
legacyPath: /legacy-static/index.html#/apps/cc-switch
---

## 这篇内容解决什么问题

这篇文章把 CC Switch 最常见的两条接入路线放到一起：

- 一条给 **Codex**
- 一条给 **Claude Code**


> 配置方式本质上是相通的，很多别的应用也都可以借鉴 Codex 这条配置思路，最容易填错的是 `baseUrl`。建议先把 Codex 配好，先拿到这本“焚决”，后面再让 Codex 帮你继续配其他应用，会顺很多。

## 开始前先准备好

正式进入步骤之前，先确认你已经准备好了下面这几样：

- 你自己的 Ergouzi API Token(令牌)
- 你要接入的目标对象：微软商店下载好 Codex 

如果你还没有 Token，先去看：

- [创建 API Token](/guides/token)

如果你现在还分不清 Token、分组和模型支持的关系，先回看：

- [账号与 Token 基础说明](/guides/token-billing)

另外有两个关键地址需要记住：

- Codex 路线使用：`https://ergouzi.life/v1`
- Claude 路线使用根地址：`https://ergouzi.life`

![CC Switch 下载页与主界面入口](/assets/cc-switch/download-release.png)

---

## Codex 路线

### 第一步：进入 Codex 页面并添加供应商

在 CC Switch 顶部切换到 **Codex**，然后点击右上角的 **+**，开始添加新的 Codex 供应商。

![CC Switch 主界面中的 Codex 标签与添加按钮](/assets/cc-switch/openai-1.png)

### 第二步：选择自定义配置并填写名称

在“添加新供应商”页面中，选择 **自定义配置**，再填写供应商名称。  
名称只影响你在本地识别这套配置，不影响请求本身。

![Codex 供应商页面中的自定义配置与名称填写](/assets/cc-switch/openai-2.png)

### 第三步：填写 API Key、请求地址和模型

Codex 路线里最关键的三项是：

- **API Key**：你的 Ergouzi Token
- **API 请求地址**：`https://ergouzi.life/v1`
- **模型名称**：建议先用一个稳定文本模型，比如 `gpt-5.4`

这里最容易错的地方，就是忘记补 `/v1`。  
如果地址只写到根域名，很多情况下测试会直接失败。

![Codex 供应商表单中的 API Key、地址与模型](/assets/cc-switch/openai-3.png)

### 第四步：确认 auth.json 和 config.toml 自动生成

CC Switch 会自动生成 Codex 需要的 `auth.json` 和 `config.toml`。  
进行配置时，建议点击 + 号新增，而不是去修改已有配置，因为可能会导致配置的相互覆盖而无法使用。

你此时主要看这几件事：

- `auth.json` 是否已经写入 API Key
- `config.toml` 是否已经写入 provider、模型和请求地址
- 配置里是否明确指向 `https://ergouzi.life/v1`

![CC Switch 自动生成的 auth.json 与 config.toml](/assets/cc-switch/openai-4.png)

### 第五步：先测试，再启用

添加完成后，先测试，再启用：

1. 点击 **测试**
2. 确认看到运行正常的提示
3. 再点击 **启用**

这样做的好处是，你能把“配置写入失败”和“CLI 实际使用失败”分开判断。

![Codex 供应商列表中的测试与启用按钮](/assets/cc-switch/openai-5.png)

### Codex 路线排错建议

- 测试失败：先检查请求地址是否写成了 `https://ergouzi.life/v1`
- 模型不可用：先换成当前分组稳定支持的文本模型，比如 `gpt-5.4`
- 切换后Codex还是无法使用：切换一下CC switch中的配置，退出Codex软件，重新打开，若还不行就删除codex的config.toml，重新添加配置

---

## Claude Code 路线

### 第一步：进入 Claude 页面并添加供应商

打开 CC Switch 后，先切到 **Claude** 标签页，再点击右上角的 **+**，准备添加一个新的 Claude 供应商。

![CC Switch 主界面中的 Claude 标签与添加按钮](/assets/cc-switch/claude-1.png)

### 第二步：填写供应商名称

在添加页面里，先填写一个容易识别的名称。  
这个名称主要用于你本地切换时辨认，不会影响真正的请求结果。

![Claude 供应商名称填写页](/assets/cc-switch/claude-2.png)

### 第三步：填写 API Key 和请求地址

Claude 这条路线里，最关键的是两项：

- **API Key**：填写你在 Ergouzi 控制台里生成的 Token
- **请求地址**：填写 `https://ergouzi.life`

如果地址写成了别的格式，或者 Key 复制不完整，后面的测试基本都会失败。

![Claude 供应商表单中的 API Key 与请求地址](/assets/cc-switch/claude-3.png)

### 第四步：先测试，再启用

供应商添加完成后，不要直接假设已经可用。  
正确顺序应该是：

1. 先点 **测试**
2. 看到通过提示
3. 再点 **启用**

测试通过只说明当前配置能连通；点了启用之后，Claude Code 才会真正切到这套配置。

![Claude 供应商列表中的测试与启用按钮](/assets/cc-switch/claude-3.png)

### 第五步：进入设置页

如果你后面要继续优化 Claude Code 的体验，可以点击左上角齿轮进入设置页。

![CC Switch 左上角齿轮设置入口](/assets/cc-switch/claude-4.png)

### 第六步：开启跳过初次安装确认

在设置页里，建议开启 **跳过 Claude Code 初次安装确认**。  
这样做的目的，是让 Claude Code 在切换到当前供应商后能更直接进入可用状态。

![设置页中的跳过 Claude Code 初次安装确认开关](/assets/cc-switch/claude-5.png)

### 第七步：启动 Claude Code 做最终验证

切换完成后，回到终端执行一次最简单的验证：

1. 打开终端
2. 输入 `claude`
3. 发一条简单消息
4. 看它是否能正常回复

前面的测试通过和本地切换成功，都只是中间状态。最终还是要以 Claude Code 里能否真正启动、能否真正回复为准。

![Claude Code 终端中的启动与对话验证](/assets/cc-switch/claude-6.png)

### Claude 路线排错建议

- 页面测试失败：优先检查 API Key 是否复制完整，请求地址是否填写为 `https://ergouzi.life`
- 测试通过但 Claude Code 不能正常工作：先去掉复杂的本地附加配置，只保留最小可用配置
- 切换后仍然像是在走旧配置：彻底关闭终端，再重新添加配置，避免配置的互相污染
- 模型返回 503：回到模型广场确认当前令牌分组是否支持这个模型
- Claude Code中使用gpt等第三方模型：Claude Code对模型名字进行了限制，不能接入第三方模型，可以让codex帮忙做一个名字映射，给gpt等第三方模型，前面加一个calude-/等前缀，具体情况，可让 Codex 分析并执行

---

## 最后怎么判断已经真的成功

无论你走哪条路线，最后判断是否成功都建议按这套顺序来：

1. 页面配置写入成功
2. 页面测试通过
3. 页面启用成功
4. 本地 CLI 真正启动成功
5. 发一条简单消息能正常返回

只有第 5 步也通过，才算这条链路真的接通。

## 下一步建议

- 如果你还在排错，先不要同时改太多配置，移步 [常见问题](/faq) 查看对应的解决办法
