---
title: 编辑器与插件
slug: /apps/editor-tools
group: apps
summary: 在 Cursor、Continue 这类编辑器或插件里接入 Ergouzi，重点看 OpenAI Compatible 地址、模型选择和自动补全配置。
order: 45
legacyPath: /legacy-static/index.html#/apps/editor-tools
---

## 这篇内容适合谁

如果你主要是在编辑器里写代码，而不是在独立聊天客户端或终端里工作，这篇就是对应入口。

它主要覆盖两类场景：

- 你想在 Cursor 里接第三方模型
- 你想在 Continue 里同时配置聊天模型和 Tab 自动补全模型

这类工具的共同点是：界面上看起来都像“接 OpenAI”，但真正决定能不能跑通的，通常是 `Base URL`、模型名和客户端自己的兼容约束。

## 先记住这条主线

大多数编辑器集成，优先走 **OpenAI Compatible**。

根因很直接：

- 配置字段最通用
- 现成插件和界面支持最多
- 你后面要切模型或换客户端，迁移成本也最低

根地址先记住：

`https://ergouzi.life`

如果某个客户端明确要求填到 `/v1`，再按它的字段约定补；如果只说填“OpenAI 兼容根地址”或“自定义提供商地址”，通常先填根地址更稳。

如果你还没验证过最小请求，建议先跑：

- [OpenAI Compatible 最小示例](/examples/openai-compatible)

## Cursor

### 适合怎么接

打开右上角齿轮，进入 **Settings -> Models**。如果你当前版本支持自定义 OpenAI 兼容提供商，优先用这一条路。

建议优先确认这几项：

| 项目 | 建议填写 |
| --- | --- |
| 接入模式 | 自定义 OpenAI 兼容提供商 / 自定义模型端点 |
| API Key | 你的 Ergouzi API Key |
| Base URL | `https://ergouzi.life` |
| 模型 | 先用一个稳定的通用模型验证 |

### 关于 Claude 模型别名

Cursor 这一类产品有时会对某些 Claude 模型使用自己的兼容别名，而不是直接展示平台原始模型名。

旧教程里常见过这类名称：

- `cursor-3-5-sonnet-20240620`
- `cursor-3-5-sonnet-latest`

但这里别死记硬背。更稳的判断顺序是：

1. 如果当前 Cursor 版本能直接拉取自定义模型列表，优先直接选实际拉到的模型
2. 如果它明确要求某类 Cursor 兼容别名，再按该版本的要求填

### 最容易踩的坑

- 模型能看到，但请求其实还在走官方端点
- Base URL 填成了错误的子路径
- 客户端界面显示“兼容 OpenAI”，但内部仍有自己的模型名限制

所以对 Cursor 来说，重点不只是“填完字段”，而是确认它**真的**把请求发到了 Ergouzi。

## Continue

Continue 的配置比 Cursor 更明确，因为它把“聊天模型”和“自动补全模型”拆开了。

一个常见配置长这样：

```json
{
  "models": [
    {
      "model": "gpt-4o",
      "provider": "openai",
      "apiKey": "your_api_key_here",
      "apiBase": "https://ergouzi.life",
      "title": "GPT-4o Ergouzi"
    }
  ],
  "tabAutocompleteModel": {
    "title": "GPT-4o Autocomplete",
    "provider": "openai",
    "model": "gpt-4o",
    "apiKey": "your_api_key_here",
    "apiBase": "https://ergouzi.life"
  }
}
```

这里可以这样理解：

- `models`：用于聊天、编辑、Agent 交互
- `tabAutocompleteModel`：用于代码自动补全

如果你更在意成本，最常见的做法不是把整套都换掉，而是：

- 聊天和 Agent 用更强的通用模型
- 自动补全单独换成更便宜的小模型

## 推荐做法

先把路径收紧，别一上来就同时调很多旋钮。

推荐顺序是：

1. 先用一个稳定的文本模型把聊天能力接通
2. 再单独调自动补全模型
3. 最后再尝试 Claude 兼容别名、专门的补全模型或更复杂的 Agent 流程

这样出问题时，你能更快判断到底是：

- Key 权限问题
- URL 问题
- 模型名问题
- 客户端自己的兼容实现问题

## 常见错误

### 1. `apiBase` 填对了，看不到模型

优先检查：

- 客户端是否对地址又自动拼了路径
- Key 是否可用
- 当前 Token 分组是否支持你要看的模型

### 2. 聊天能用，自动补全不能用

这类情况很多时候不是“Continue 坏了”，而是你把聊天模型和补全模型都绑成了同一套，但客户端实际对补全模型的行为要求更敏感。

先单独给自动补全换一个更稳、更轻的模型，通常更容易定位问题。

### 3. 只看界面提示，不验证真实请求

编辑器集成最容易出现的错觉就是：界面看起来像已经接好了，实际请求却没走对。

如果你怀疑这里出了问题，先回去用最小 `curl` 验证：

- [OpenAI Compatible 接入](/api/openai-compatible)
- [OpenAI Compatible 最小示例](/examples/openai-compatible)

## 和其他页面怎么配合

- [OpenAI Compatible 接入](/api/openai-compatible)：先把接口规则看清
- [OpenAI Compatible 最小示例](/examples/openai-compatible)：先排掉 Key、地址和模型这层基础问题
- [CLI 与编码助手](/apps/cli-tools)：如果你不是编辑器内工作，而是终端工作流
- [聊天客户端接入](/apps/chat-clients)：如果你用的是聊天壳而不是 IDE

## 一句话总结

编辑器集成的重点不是“某个工具写了支持 OpenAI”，而是：  
**把它的请求真正稳定地切到 Ergouzi，再分别处理聊天模型和自动补全模型。**
