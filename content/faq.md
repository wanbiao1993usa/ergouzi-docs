## 1. 怎么收费，有哪些套餐，余额会清零吗

> 目前只有按量计费方式，用多少，扣多少，余额不会清零，不用则不会消耗。不过站长会不定时在 V 群中发放无限流量套餐名额。


## 2. 配置好了不能用怎么办

> 可以先去二狗子网站控制台的操练场，直接做一轮对话测试。

如果操练场里能正常对话，说明问题大概率不在账号本身，而在：

- 本地配置
- 或者网络链路

- [如何排查网络问题](#3-如何排查网络问题)
- [如何排查配置问题](#4-如何排查配置问题)

## 3. 如何排查网络问题

> 更换节点，或者开启虚拟网卡模式，不要使用系统代理模式。

如果你已经确认账号和 Key 本身没问题，但请求还是时好时坏，优先从网络侧下手：

- 先换一个节点再测
- 优先使用虚拟网卡模式
- 不要使用系统代理模式

像 `client_gone`、流式中断、偶发超时这类问题，经常都和这里有关。

## 4. 如何排查配置问题

> 网络没问题，也配置好了，但是测试不通，或者测试通了却无法使用，优先按这一套顺序排。

先看最常见的几个点：

1. 检查 API Key 是否设置到了正确分组
2. 不要修改 CC Switch 里原有配置，应该点击 `+` 新增一个配置
3. 如果启用配置后无法成功对话，先退出 Codex 软件
4. 重新添加一个新配置，启用后再打开 Codex 软件

如果这样还不行，再继续做最后一步清理：

- 删除 `C:/Users/你的用户名/.codex/config.toml`
- 然后重新添加配置并启用

很多“明明测试通了，但正式使用不正常”的问题，本质上都是旧配置污染，没有清干净。

## 5. unexpected status 401 Unauthorized

> 这类问题大多数不是账号没了，而是配置不干净。

先按[《如何排查配置问题》](#4-如何排查配置问题)完整走一遍，尤其注意：

- 不要改旧配置，要新建配置
- 退出 Codex 后再重新启用配置
- 必要时删除 `.codex/config.toml` 后重建

## 6. stream disconnected before completion: stream closed before response.completed

> 这类问题通常也是配置不干净。

优先顺序建议是：

1. 先按[《如何排查配置问题》](#4-如何排查配置问题)走一遍
2. 再按[《如何排查网络问题》](#3-如何排查网络问题)走一遍

如果两边都没清掉，再回来看下面这些更细的场景问题。

## 7. 得到了焚决，就得到了一切

> 配置好 Codex ，什么不会就找它问，OpenAI 发布 Codex 重大更新，号称 —— “Codex for (almost) everything”

## 8. 日志里出现 client_gone 怎么办

> 先检查网络。如果日志里出现 client_gone，优先判断自己的网络或代理是否有波动。

这类问题很多时候不是账号、模型或 Token 本身出了问题，而是请求链路中断了。先确认本地网络和代理状态，再继续排查应用层配置。

## 9. API Error: 503 No available channel for model ... under group ...

> 这类错误最常见的原因，是当前 Token 所在分组不支持这个模型。

你应该先去模型广场确认该模型支持哪些分组，然后再决定是：

- 换一个支持当前分组的模型
- 或者重新创建一个属于正确分组的 Token

如果你还没完全搞清楚 Token、分组和价格倍率之间的关系，建议先回去看[《账号与 Token 基础说明》](/guides/token-billing)。

## 10. 国产 Trae 是否支持自定义接口

> 支持。新版 Trae CN 在“模型”里添加自定义模型时，请求地址应填写完整的 `https://ergouzi.life/v1/chat/completions`。

如果你准备继续配置 Trae，可以直接去看[《Trae CN 配置》](/apps/trae-cn)，按图一步步填。

## 11. OpenAI 模型可以直接在 Claude Code 里使用吗

> 可以。由于 Claude Code 会校验它的模型名只能是自家的，思路是把模型名称进行一个映射，可以让 Codex 帮你做

或者把 Claude Code 的 Anthropic 环境变量指向 Ergouzi，再把默认模型改成你要使用的 OpenAI 模型名。

```bash
export ANTHROPIC_BASE_URL="https://ergouzi.life"
export ANTHROPIC_AUTH_TOKEN="sk-your-api-token"
export ANTHROPIC_DEFAULT_SONNET_MODEL="gpt-5.4"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="gpt-5.4"

claude
```

## 12. Claude Code 的 VS Code 插件可以使用吗

> 可以。在 CC Switch 的左上角设置中，启用里面的应用到 Claude Code插件，可直接解决

或者在 VS Code 用户级 `settings.json` 里加入下面这组环境变量即可：

```json
{
  "claudeCode.environmentVariables": [
    { "name": "ANTHROPIC_BASE_URL", "value": "https://ergouzi.life" },
    { "name": "ANTHROPIC_AUTH_TOKEN", "value": "sk-your-api-token" },
    { "name": "ANTHROPIC_MODEL", "value": "gpt-5.4" },
    { "name": "ANTHROPIC_DEFAULT_OPUS_MODEL", "value": "gpt-5.4" },
    { "name": "ANTHROPIC_DEFAULT_SONNET_MODEL", "value": "gpt-5.4" },
    { "name": "ANTHROPIC_DEFAULT_HAIKU_MODEL", "value": "gpt-5.4" }
  ],
  "claudeCode.preferredLocation": "panel"
}
```

把 `sk-your-api-token` 换成你自己的 Token，保存后重载 VS Code 窗口即可。

![Claude Code 的 VS Code 插件 settings.json 配置示例](/assets/faq/claude-code-vscode-settings.png)
