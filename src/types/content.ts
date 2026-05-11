export type SiteSectionId = "guides" | "apps" | "api" | "sdk" | "examples";

export type SectionTone = "buy" | "tools" | "api" | "sdk" | "examples";

export type SecondaryGroup = {
  id: string;
  title: string;
  description: string;
};

export type SiteSection = {
  id: SiteSectionId;
  title: string;
  path: string;
  description: string;
  tone: SectionTone;
  recommendedTitle: string;
  recommendedDescription: string;
  recommendedCount?: number;
  secondaryGroups?: SecondaryGroup[];
};

export type DocMeta = {
  title: string;
  slug: string;
  group: SiteSectionId;
  summary: string;
  order: number;
  legacyPath?: string;
  bucket?: string;
};

export type SiteDoc = DocMeta & {
  path: string;
  groupTitle: string;
  sourceKey: string;
};

export type LoadedDoc = SiteDoc & {
  markdown: string;
};
