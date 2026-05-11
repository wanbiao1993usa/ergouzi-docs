# Ergouzi Docs Routing And Navigation Update

## 1. 结论

需要，而且应该明确加。

但这里要先区分两件事：

1. `菜单路由`：解决“用户去哪里找内容”。
2. `页面内切换`：解决“同一主题下，不同平台或不同配置方式怎么切换看”。

这两个层级不能混在一起。  
如果全部塞进首页，问题不是页面长，而是信息边界消失，用户不知道自己当前在看哪一类教程。

所以建议：

- 首页只做分流，不承载完整教程。
- 左侧菜单和 URL 路由承载“教程分类”。
- 页面内 Tabs 或二级导航承载“同一教程下的平台/方式切换”。

## 2. 为什么要加，而不是继续堆首页

### 2.1 真实问题

你现在不是缺一个菜单组件，而是缺“清晰的信息分层”。

如果不拆路由，后面会出现三个问题：

1. 首页会越来越长，变成教程垃圾场。
2. 用户看到的是一堆入口，但不知道自己应该走哪条路径。
3. 后续迁移 Markdown 时，很难定义每篇文档的边界。

### 2.2 业务上真正需要的分层

教程站的核心不是展示全部内容，而是让用户快速回答：

1. 我属于哪个平台？
2. 我应该走哪种配置方式？
3. 我现在看的这页，是总览、步骤页，还是某个平台的具体配置？

所以必须靠路由把这三层拆开。

## 3. 推荐的信息架构

建议把内容拆成三层：

### 第一层：首页分流

首页只保留高层入口，不展开完整教程。

首页可以放：

- 新手开始
- CC Switch 快速配置 Codex
- 应用接入
- API 接入
- SDK 接入
- 常见问题

首页作用是“帮用户选路”，不是“把整套说明都讲完”。

### 第二层：分类路由

用一级或二级路由表达内容类型，例如：

```text
/
/guides
/apps
/api
/sdk
/examples
/faq
```

这一层解决的是“我现在在哪个内容区”。

### 第三层：具体教程路由

再往下按平台或主题拆为具体教程，例如：

```text
/apps/cherry-studio
/apps/trae-cn
/apps/cc-switch
/apps/chat-clients
/api/openai-compatible
/api/claude-native
/sdk/openai
/sdk/claude
```

这一层解决的是“我现在正在看哪篇具体教程”。

## 4. 平台切换和配置方式切换，怎么放最清晰

这里最容易做错，所以要先定规则。

### 4.1 什么时候应该用独立路由

如果满足下面任一条件，就应该拆成独立路由：

- 截图不同
- 步骤顺序不同
- 配置项差异明显
- 面向的人群不同
- 后续会独立维护

例如：

- `Cherry Studio`
- `Trae CN`
- `CC Switch`
- `OpenAI Compatible API`
- `Claude Native API`

这些都不应该混在同一篇长文里硬切换。

### 4.2 什么时候适合放在同页切换

如果只是“同一教程里的局部差异”，才适合做页面内切换，例如：

- `Windows / macOS` 的单步差异
- `OpenAI / Claude` 两段相似配置
- `Node.js / Python` 代码示例切换

也就是说：

- `教程边界不同` 用路由拆。
- `教程内部局部差异` 用 Tabs 拆。

## 5. 推荐路由设计

建议先按“内容类型 + 具体对象”来定，而不是按技术实现来定。

### 5.1 一级路由

```text
/
/start
/guides
/apps
/api
/sdk
/examples
/faq
```

说明：

- `/`：首页，负责分流
- `/start`：新手起步页，给第一次使用的人
- `/guides`：账户、购买、Token 等基础流程
- `/apps`：应用接入
- `/api`：API 接入
- `/sdk`：SDK 接入
- `/examples`：请求示例
- `/faq`：问题排查

### 5.2 二级路由

```text
/guides/token-billing
/guides/purchase
/guides/subscription
/guides/token

/apps/cherry-studio
/apps/trae-cn
/apps/cc-switch
/apps/editor-tools
/apps/cli-tools

/api/openai-compatible
/api/claude-native
/api/gemini-native

/sdk/openai
/sdk/claude
/sdk/gemini

/examples/chat-completions
/examples/responses
/examples/images
/examples/audio
```

### 5.3 首页特殊入口

首页的 `CC Switch 快速配置 Codex` 建议不要做成单独长页面预览块，而是：

- 首页显示一个 3 到 5 步的简短文字版
- 配一个 “查看完整教程” 按钮
- 跳转到 `/apps/cc-switch`

这样首页是短入口，正文页才是完整说明。

## 6. 菜单结构建议

菜单建议也分层，不要只有一个大列表。

### 6.1 左侧主菜单

用于跨分类跳转：

- 开始
- 基础教程
- 应用接入
- API 接入
- SDK 接入
- 请求示例
- 常见问题

### 6.2 分类页内菜单

例如进入 `/apps` 后，再展示应用列表：

- Cherry Studio
- Trae CN
- CC Switch
- 聊天客户端
- 编辑器工具
- CLI 工具

### 6.3 当前页目录

用于页面内章节导航，例如：

- 准备工作
- 第一步
- 第二步
- 常见问题

这三层分别解决不同问题：

- 主菜单：去哪一类
- 分类菜单：去哪一篇
- 页面目录：看这一篇的哪一段

## 7. 对 Markdown 迁移的影响

这个路由设计还有一个好处：能直接反推 Markdown 的拆分边界。

推荐一篇文档只对应一个“稳定路由”：

```text
content/
  apps/
    cc-switch.md
    cherry-studio.md
  api/
    openai-compatible.md
```

不要把多个平台都塞进一个 Markdown，再依赖大量条件渲染拆开。  
那样会把旧问题带进新系统。

## 8. 实现层建议

### 8.1 路由驱动菜单

菜单不要手写两套，建议从内容元数据生成：

- `group`
- `slug`
- `title`
- `order`
- `platform`
- `method`

这样新增一篇 Markdown，就能自动进入菜单。

### 8.2 页面内切换

建议只在以下内容使用 Tabs：

- 代码语言切换
- 同一功能的不同模型配置
- 同一教程内的少量平台差异

不要用 Tabs 代替真正的文档拆分。

## 9. 新增验收标准

在原 spec 基础上，再增加这几条：

1. 首页不承载完整教程，只承载高层入口和快速说明。
2. 不同平台或不同配置方式有清晰的路由边界。
3. 左侧菜单能按分类管理教程，而不是单一平铺。
4. 同页切换只用于局部差异，不替代页面拆分。
5. `CC Switch 快速配置 Codex` 首页模块跳转到独立正文页 `/apps/cc-switch`。

## 10. 最终建议

要加，但不要只理解成“加一个菜单组件”。

更准确地说，这次重构应该把站点结构定成：

1. 首页负责分流
2. 分类路由负责管理平台和配置方式
3. 具体教程页负责完整步骤
4. 页面内切换只处理局部差异

这样文档才会越写越清晰，而不是越写越挤在首页里。
