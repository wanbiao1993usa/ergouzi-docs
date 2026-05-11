import type { DocMeta, LoadedDoc, SiteDoc, SiteSection, SiteSectionId } from "../types/content";

type DocDefinition = DocMeta & {
  sourceKey: string;
};

const rawDocModules = import.meta.glob("../../content/**/*.md", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;
const loadedDocCache = new Map<string, LoadedDoc>();
const pendingDocCache = new Map<string, Promise<LoadedDoc | null>>();

export const sections: SiteSection[] = [
  {
    id: "guides",
    title: "购买教程",
    path: "/guides",
    description: "目前只支持按量计费方式，请购买普通余额兑换码，兑换使用，V群会不定时发放无限额度套餐",
    tone: "buy",
    recommendedTitle: "推荐阅读顺序",
    recommendedDescription: "第一次接入时，先把计费和 Token 关系看明白，再决定走余额还是订阅路线。",
  },
  {
    id: "apps",
    title: "客户端与工具",
    path: "/apps",
    description: "面向 Cherry Studio、Trae、聊天客户端和 CLI 工具的实际配置路线。",
    tone: "tools",
    recommendedTitle: "推荐先看这几篇",
    recommendedDescription: "先走最短路径，再按你真正使用的客户端或工具继续下钻。",
    secondaryGroups: [
      {
        id: "fast-path",
        title: "快速入口",
        description: "适合先把主要路由跑通，再决定后续落在哪个客户端或工具里。",
      },
      {
        id: "desktop-apps",
        title: "桌面客户端",
        description: "面向独立桌面应用，通常以界面配置和截图核对为主。",
      },
      {
        id: "editor-tools",
        title: "编辑器与插件",
        description: "面向 IDE、代码编辑器和插件，重点是模型路由、自动补全和兼容字段。",
      },
      {
        id: "chat-clients",
        title: "聊天客户端",
        description: "面向通用聊天壳，重点是兼容字段、模型列表和基础对话验证。",
      },
      {
        id: "developer-tools",
        title: "终端与编码助手",
        description: "面向 CLI、编码代理和开发工作流，更偏工程接入和模型切换。",
      },
      {
        id: "translator-bots",
        title: "翻译与机器人",
        description: "面向翻译插件、翻译器和机器人平台，重点是根地址、模型列表和 embedding。",
      },
    ],
  },
  {
    id: "api",
    title: "API 接入",
    path: "/api",
    description: "按协议和调用入口组织，适合先把接口规则和边界看清。",
    tone: "api",
    recommendedTitle: "默认阅读起点",
    recommendedDescription: "没有特殊约束时，优先从 OpenAI Compatible 入口开始。",
    recommendedCount: 1,
  },
  {
    id: "sdk",
    title: "SDK 接入",
    path: "/sdk",
    description: "按 OpenAI、Claude、Gemini 三条 SDK 路线组织，适合直接进入项目代码。",
    tone: "sdk",
    recommendedTitle: "推荐阅读顺序",
    recommendedDescription: "大多数项目先看 OpenAI SDK；只有已经绑定原生 SDK 生态时，再走 Claude 或 Gemini。",
  },
  {
    id: "examples",
    title: "调用示例",
    path: "/examples",
    description: "最常见、最适合复制验证的请求示例和能力片段。",
    tone: "examples",
    recommendedTitle: "建议先跑通这一条",
    recommendedDescription: "如果你只想先验证 Key 和地址，先跑 OpenAI Compatible 最小示例；如果要进入长期主线，优先看 Responses。",
    secondaryGroups: [
      {
        id: "core-requests",
        title: "通用请求结构",
        description: "先把文本与多模态的基础请求结构跑通，再考虑更具体的能力接口。",
      },
      {
        id: "media-capabilities",
        title: "媒体能力",
        description: "面向图像和音频场景，通常建立在基础请求已跑通的前提上。",
      },
      {
        id: "native-apis",
        title: "原生接口",
        description: "适合明确不走 OpenAI Compatible，而要继续沿用提供商原生请求结构的场景。",
      },
    ],
  },
];

const docDefinitions: DocDefinition[] = [
  {
    sourceKey: "../../content/guides/purchase.md",
    title: "购买普通余额兑换码",
    slug: "/guides/purchase",
    group: "guides",
    summary: "从注册登录、购买兑换码到最终把额度兑换进账户的完整流程。",
    order: 10,
    legacyPath: "/legacy-static/index.html#/purchase-guide",
  },
  {
    sourceKey: "../../content/guides/token-billing.md",
    title: "账号与 Token 基础说明",
    slug: "/guides/token-billing",
    group: "guides",
    summary: "先看懂 Token、分组和付费方式之间的关系，再去创建 API Token。",
    order: 20,
    legacyPath: "/legacy-static/index.html#/token-billing-guide",
  },
  {
    sourceKey: "../../content/guides/token.md",
    title: "创建 API Token",
    slug: "/guides/token",
    group: "guides",
    summary: "在控制台创建 API Token，并正确选择分组与费率。",
    order: 30,
    legacyPath: "/legacy-static/index.html#/token-guide",
  },
  {
    sourceKey: "../../content/guides/subscription.md",
    title: "购买无限订阅",
    slug: "/guides/subscription",
    group: "guides",
    summary: "从注册登录、购买无限订阅套餐到联系客服手动开通的完整流程。",
    order: 40,
    legacyPath: "/legacy-static/index.html#/subscription-guide",
  },
  {
    sourceKey: "../../content/apps/cc-switch.md",
    title: "CC Switch 配置 Codex",
    slug: "/apps/cc-switch",
    group: "apps",
    summary: "先用 CC Switch 跑通 Codex 这条最短链路，再把同样的配置思路迁移到 Claude Code 和别的应用。",
    order: 10,
    legacyPath: "/legacy-static/index.html#/apps/cc-switch",
    bucket: "fast-path",
  },
  {
    sourceKey: "../../content/apps/cherry-studio.md",
    title: "Cherry Studio 集成",
    slug: "/apps/cherry-studio",
    group: "apps",
    summary: "在 Cherry Studio 中添加 Ergouzi 提供商、填写 API Key 和地址、拉取模型并完成对话测试。",
    order: 20,
    legacyPath: "/legacy-static/index.html#/apps/cherry-studio",
    bucket: "desktop-apps",
  },
  {
    sourceKey: "../../content/apps/trae-cn.md",
    title: "Trae CN 配置",
    slug: "/apps/trae-cn",
    group: "apps",
    summary: "在 Trae CN / SOLO Coder 中添加自定义模型，填写模型 ID、API Key 和完整请求地址。",
    order: 30,
    legacyPath: "/legacy-static/index.html#/apps/trae-cn",
    bucket: "desktop-apps",
  },
  {
    sourceKey: "../../content/apps/chat-clients.md",
    title: "聊天客户端接入",
    slug: "/apps/chat-clients",
    group: "apps",
    summary: "Next Chat、Lobe Chat、Chatbox、ChatWise、uTools 等聊天客户端的接入方式速查。",
    order: 40,
    legacyPath: "/legacy-static/index.html#/apps/chat-clients",
    bucket: "chat-clients",
  },
  {
    sourceKey: "../../content/apps/editor-tools.md",
    title: "编辑器与插件",
    slug: "/apps/editor-tools",
    group: "apps",
    summary: "在 Cursor、Continue 这类编辑器或插件里接入 Ergouzi，重点看 OpenAI Compatible 地址、模型选择和自动补全配置。",
    order: 45,
    legacyPath: "/legacy-static/index.html#/apps/editor-tools",
    bucket: "editor-tools",
  },
  {
    sourceKey: "../../content/apps/cli-tools.md",
    title: "CLI 与编码助手",
    slug: "/apps/cli-tools",
    group: "apps",
    summary: "Claude Code、Codex CLI、Gemini CLI、OpenCode 等终端工具的接入方式合集。",
    order: 50,
    legacyPath: "/legacy-static/index.html#/apps/cli-tools",
    bucket: "developer-tools",
  },
  {
    sourceKey: "../../content/apps/translator-bots.md",
    title: "翻译工具与机器人",
    slug: "/apps/translator-bots",
    group: "apps",
    summary: "FluentRead、LunaTranslator、LangBot 这类翻译工具与机器人平台的接入方式，重点看根地址、模型拉取和 embedding 配置。",
    order: 60,
    legacyPath: "/legacy-static/index.html#/apps/translator-bots",
    bucket: "translator-bots",
  },
  {
    sourceKey: "../../content/api/openai-compatible.md",
    title: "OpenAI Compatible 接入",
    slug: "/api/openai-compatible",
    group: "api",
    summary: "用统一的 OpenAI Compatible 入口接入大多数文本、多模态、图片和音频场景。",
    order: 10,
    legacyPath: "/legacy-static/index.html#/api/openai-compatible",
  },
  {
    sourceKey: "../../content/api/claude-native.md",
    title: "Claude 原生接入",
    slug: "/api/claude-native",
    group: "api",
    summary: "按 Anthropic Messages API 的原生请求结构接入 Claude，重点看鉴权头、版本头和适用边界。",
    order: 20,
    legacyPath: "/legacy-static/index.html#/api/claude-native",
  },
  {
    sourceKey: "../../content/api/gemini-native.md",
    title: "Gemini 原生接入",
    slug: "/api/gemini-native",
    group: "api",
    summary: "按 Google Gemini 的原生请求格式接入，重点看 generateContent、streamGenerateContent 和 x-goog-api-key。",
    order: 30,
    legacyPath: "/legacy-static/index.html#/api/gemini-native",
  },
  {
    sourceKey: "../../content/sdk/openai.md",
    title: "OpenAI SDK 接入",
    slug: "/sdk/openai",
    group: "sdk",
    summary: "在真实项目里继续使用 OpenAI 官方 SDK，对接 Ergouzi 的 OpenAI Compatible 入口。",
    order: 10,
    legacyPath: "/legacy-static/index.html#/sdk/openai",
  },
  {
    sourceKey: "../../content/sdk/claude.md",
    title: "Claude SDK 接入",
    slug: "/sdk/claude",
    group: "sdk",
    summary: "使用 Anthropic 官方 SDK 连接 Ergouzi 的 Claude 原生入口。",
    order: 20,
    legacyPath: "/legacy-static/index.html#/sdk/claude",
  },
  {
    sourceKey: "../../content/sdk/gemini.md",
    title: "Gemini SDK 接入",
    slug: "/sdk/gemini",
    group: "sdk",
    summary: "使用 Google GenAI 官方 SDK 连接 Ergouzi 的 Gemini 原生入口。",
    order: 30,
    legacyPath: "/legacy-static/index.html#/sdk/gemini",
  },
  {
    sourceKey: "../../content/examples/responses.md",
    title: "Responses 示例",
    slug: "/examples/responses",
    group: "examples",
    summary: "使用统一的 Responses 接口组织文本与多模态输入，适合新项目和更复杂的输入结构。",
    order: 10,
    legacyPath: "/legacy-static/index.html#/examples/responses",
    bucket: "core-requests",
  },
  {
    sourceKey: "../../content/examples/openai-compatible.md",
    title: "OpenAI Compatible 最小示例",
    slug: "/examples/openai-compatible",
    group: "examples",
    summary: "用一段最小 curl 先验证 OpenAI Compatible 入口、Key 和模型是否跑通，再决定往 Responses、Chat Completions 或媒体能力继续扩展。",
    order: 15,
    legacyPath: "/legacy-static/index.html#/examples/openai-compatible",
    bucket: "core-requests",
  },
  {
    sourceKey: "../../content/examples/chat-completions.md",
    title: "Chat Completions 示例",
    slug: "/examples/chat-completions",
    group: "examples",
    summary: "使用传统 OpenAI messages 结构发起聊天、多模态输入和工具调用请求。",
    order: 20,
    legacyPath: "/legacy-static/index.html#/examples/chat-completions",
    bucket: "core-requests",
  },
  {
    sourceKey: "../../content/examples/images.md",
    title: "Images 示例",
    slug: "/examples/images",
    group: "examples",
    summary: "使用 OpenAI Compatible 的 Images 接口完成图像生成、编辑和变体处理。",
    order: 30,
    legacyPath: "/legacy-static/index.html#/examples/images",
    bucket: "media-capabilities",
  },
  {
    sourceKey: "../../content/examples/audio.md",
    title: "Audio 示例",
    slug: "/examples/audio",
    group: "examples",
    summary: "使用 OpenAI Compatible 的 Audio 接口完成语音转文字和文字转语音。",
    order: 40,
    legacyPath: "/legacy-static/index.html#/examples/audio",
    bucket: "media-capabilities",
  },
  {
    sourceKey: "../../content/examples/claude.md",
    title: "Claude 原生示例",
    slug: "/examples/claude",
    group: "examples",
    summary: "使用 Claude 原生 Messages API 发起请求，包括 curl 和 Python SDK 两种方式。",
    order: 60,
    legacyPath: "/legacy-static/index.html#/examples/claude",
    bucket: "native-apis",
  },
  {
    sourceKey: "../../content/examples/gemini.md",
    title: "Gemini 原生示例",
    slug: "/examples/gemini",
    group: "examples",
    summary: "使用 Gemini 原生 generateContent、streamGenerateContent 和 Python SDK 快速验证原生入口是否可用。",
    order: 70,
    legacyPath: "/legacy-static/index.html#/examples/gemini",
    bucket: "native-apis",
  },
];

function buildDoc(definition: DocDefinition): SiteDoc {
  const section = sections.find((item) => item.id === definition.group);

  if (!section) {
    throw new Error(`Unknown section group: ${definition.group}`);
  }

  if (!rawDocModules[definition.sourceKey]) {
    throw new Error(`Unknown markdown source: ${definition.sourceKey}`);
  }

  return {
    ...definition,
    path: definition.slug,
    groupTitle: section.title,
  };
}

export const docs = docDefinitions.map(buildDoc).sort((left, right) => {
  if (left.group === right.group) {
    return left.order - right.order;
  }

  return left.group.localeCompare(right.group);
});

export const docsBySection = docs.reduce<Record<SiteSectionId, SiteDoc[]>>(
  (accumulator, doc) => {
    accumulator[doc.group].push(doc);
    return accumulator;
  },
  {
    guides: [],
    apps: [],
    api: [],
    sdk: [],
    examples: [],
  },
);

export function getSectionById(sectionId: SiteSectionId) {
  return sections.find((section) => section.id === sectionId) ?? null;
}

export function getSectionByPath(pathname: string) {
  return sections.find((section) => section.path === pathname) ?? null;
}

export function getDocsBySection(sectionId: SiteSectionId) {
  return docsBySection[sectionId];
}

export function getDocByPath(pathname: string) {
  return docs.find((doc) => doc.path === pathname) ?? null;
}

export async function loadDocByPath(pathname: string): Promise<LoadedDoc | null> {
  const cachedDoc = loadedDocCache.get(pathname);

  if (cachedDoc) {
    return cachedDoc;
  }

  const pendingDoc = pendingDocCache.get(pathname);

  if (pendingDoc) {
    return pendingDoc;
  }

  const doc = getDocByPath(pathname);

  if (!doc) {
    return null;
  }

  const markdownLoader = rawDocModules[doc.sourceKey];

  if (!markdownLoader) {
    throw new Error(`Markdown loader not found for path: ${pathname}`);
  }

  const loadingPromise = markdownLoader()
    .then((markdown) => {
      const normalizedMarkdown = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
      const loadedDoc: LoadedDoc = {
        ...doc,
        markdown: normalizedMarkdown,
      };

      loadedDocCache.set(pathname, loadedDoc);
      return loadedDoc;
    })
    .finally(() => {
      pendingDocCache.delete(pathname);
    });

  pendingDocCache.set(pathname, loadingPromise);
  return loadingPromise;
}

export function getLoadedDocByPath(pathname: string) {
  return loadedDocCache.get(pathname) ?? null;
}

export function prefetchDocsBySection(sectionId: SiteSectionId) {
  return Promise.all(docsBySection[sectionId].map((doc) => loadDocByPath(doc.path)));
}
