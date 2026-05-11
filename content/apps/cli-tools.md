---
title: CLI 与编码助手
slug: /apps/cli-tools
group: apps
summary: Claude Code、Codex CLI、Gemini CLI、OpenCode 等终端工具的接入方式合集。
order: 50
legacyPath: /legacy-static/index.html#/apps/cli-tools
---

## 这篇内容适合谁

如果你平时主要通过终端里的编码助手工作，而不是聊天客户端或桌面应用，这篇就是对应的入口。

它适合：

- Claude Code
- Codex CLI
- Gemini CLI
- OpenCode

这类工具的共同点是：

- 都能接第三方接口
- 只是有的走环境变量
- 有的走配置文件
- 有的同时需要 provider 配置和认证步骤

如果你的目标只是最快把 Codex 跑起来，不一定要先看完整合集，优先走：

- [CC Switch 配置 Codex](/apps/cc-switch)

## 先记住这几个地址

在继续往下看之前，先把这三类地址记住：

### OpenAI Compatible

`https://ergouzi.life`

### Claude 原生

`https://ergouzi.life`

### Gemini 原生

`https://ergouzi.life`

看起来它们在这里都是根地址，但真正怎么填，取决于具体工具的字段约定。

## Claude Code

Claude Code 这条路线的核心思路很直接：

- 把 Anthropic 的 Key 和 Base URL 改到 Ergouzi

最小配置方式：

```bash
npm install -g @anthropic-ai/claude-code

export ANTHROPIC_API_KEY="your_api_key_here"
export ANTHROPIC_BASE_URL="https://ergouzi.life"

claude
```

这里要注意：

- Claude Code 这类 Anthropic 客户端，通常用的是根地址
- 不要自己再额外手动拼 `/claude`

如果你后面准备继续走 SDK 路线，也可以补看：

- [Claude SDK 接入](/sdk/claude)

## OpenAI Codex CLI

Codex CLI 这条线和别的工具不太一样，它常常需要同时配置：

- 一个环境变量
- 一个本地配置文件

按旧版逻辑，最小接入方式如下：

```bash
npm install -g @openai/codex

mkdir -p ~/.codex

cat > ~/.codex/config.toml <<'EOF'
model = "gpt-5.3-codex"
model_reasoning_effort = "xhigh"
model_provider = "ergouzi"

[model_providers.ergouzi]
name = "ergouzi"
base_url = "https://ergouzi.life/v1"
env_key = "ERGOUZI_CODEX_API_TOKEN"
wire_api = "responses"
EOF

export ERGOUZI_CODEX_API_TOKEN="API_token_xxxxxxxxxxx"

codex
```

这里最关键的几个点是：

- `model_provider = "ergouzi"` 决定默认走你的自定义 provider
- `env_key` 填的是环境变量名，不是真实 Token 本身
- 真正的 Token 通过 `export ERGOUZI_CODEX_API_TOKEN=...` 提供
- 这条线使用的是 `https://ergouzi.life/v1`

## Factory Droid CLI

Factory Droid CLI 的旧教程更偏一键脚本路线。  
如果你是按它原教程走，最省事的方式通常就是直接用官方提供的安装和一键配置脚本。

### macOS / Linux

```bash
curl -fsSL https://app.factory.ai/cli | sh

# 如果你沿用旧版的一键配置脚本：
curl -fsSL https://raw.githubusercontent.com/QuantumNous/new-api-docs/refs/heads/main/helper/factory-cli-setup.sh | bash

droid
```

### Windows

```powershell
irm https://app.factory.ai/cli/windows | iex

# 如果你沿用旧版的一键配置脚本：
iex (irm 'https://raw.githubusercontent.com/QuantumNous/new-api-docs/refs/heads/main/helper/factory-cli-setup.ps1')

droid
```

如果你不走一键脚本，本质上目标还是一样：

- 把第三方 API 地址改到 Ergouzi
- 再填入你自己的 API Key

## Gemini CLI

Gemini CLI 这条路线主要通过环境变量切到 Gemini 原生入口：

```bash
npm install -g @google/gemini-cli

cat >> ~/.env <<'EOF'
GOOGLE_GEMINI_BASE_URL=https://ergouzi.life
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.5-flash
EOF

gemini
```

这里同样要注意：

- `GOOGLE_GEMINI_BASE_URL` 这里填根地址
- 不要自己手动再加 `/gemini`

如果你想继续按 SDK 方式接入，也可以补看：

- [Gemini SDK 接入](/sdk/gemini)

## OpenCode

OpenCode 这条路线的旧教程建议把 OpenAI、Anthropic 和第三方模型拆成不同 provider。  
这样做的好处是：

- 你可以保留工具对内置 provider 的特殊优化
- 同时继续挂第三方模型

示例配置：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "name": "Anthropic",
      "options": {
        "baseURL": "https://ergouzi.life"
      }
    },
    "openai": {
      "options": {
        "baseURL": "https://ergouzi.life"
      }
    },
    "ergouzi": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ergouzi",
      "options": {
        "baseURL": "https://ergouzi.life"
      },
      "models": {
        "deepseek-v3.2": {
          "name": "DeepSeek V3.2"
        }
      }
    }
  }
}
```

配置完成后，再分别执行 `opencode auth login` 给对应 provider 加凭证。第一次进入项目后，可以先跑 `/init`，再通过 `/models` 切模型。

## 这组 CLI 工具最常见的问题

### CLI 能启动，但一请求就 401

这通常不是“命令没装好”，而是：

- 环境变量加载顺序不对
- 当前 shell 没真正读到你刚写进去的变量

### 工具说自己兼容 OpenAI，但实际行为不一致

有些 CLI 表面上说兼容 OpenAI，但内部实际走的是：

- Responses
- WebSocket
- 或其它更具体的调用方式

这时“兼容 OpenAI”不等于“所有细节都完全一致”，要按工具实际行为看。

### OpenCode 这类多 provider 结构容易越配越乱

不要把所有模型都硬塞到同一个 provider 下面。  
否则很容易丢掉工具对内置 provider 的特定能力。

## 一句话总结

这组 CLI 工具虽然各自配置方式不同，但本质都在做同一件事：

**把本地终端工具接到 Ergouzi，然后继续复用你熟悉的命令行工作流。**

## 和其他页面怎么配合

- [CC Switch 配置 Codex](/apps/cc-switch)：如果你想先走最短接入路线
- [OpenAI Compatible 接入](/api/openai-compatible)：如果你要先确认 OpenAI 兼容主线
- [OpenAI Compatible 最小示例](/examples/openai-compatible)：如果你要先排掉 Key 和地址问题
