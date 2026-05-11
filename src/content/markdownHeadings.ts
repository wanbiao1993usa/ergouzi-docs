export type MarkdownHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function stripInlineMarkdown(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .trim();
}

export function slugifyHeading(value: string) {
  const normalized = stripInlineMarkdown(value)
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");

  return normalized || "section";
}

function buildHeadingId(value: string, slugCounts: Map<string, number>) {
  const baseSlug = slugifyHeading(value);
  const nextCount = (slugCounts.get(baseSlug) ?? 0) + 1;

  slugCounts.set(baseSlug, nextCount);

  if (nextCount === 1) {
    return baseSlug;
  }

  return `${baseSlug}-${nextCount}`;
}

export function buildHeadingIdList(values: string[]) {
  const slugCounts = new Map<string, number>();

  return values.map((value) => buildHeadingId(value, slugCounts));
}

export function extractMarkdownHeadings(markdown: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = [];
  const lines = markdown.split(/\r?\n/);
  let inFence = false;
  const headingTexts: Array<{ level: 2 | 3; text: string }> = [];

  for (const line of lines) {
    if (/^(```|~~~)/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }

    if (inFence) {
      continue;
    }

    const match = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);

    if (!match) {
      continue;
    }

    const level = match[1].length as 2 | 3;
    const text = stripInlineMarkdown(match[2]);

    if (!text) {
      continue;
    }

    headingTexts.push({ text, level });
  }

  const ids = buildHeadingIdList(headingTexts.map((heading) => heading.text));

  headingTexts.forEach((heading, index) => {
    headings.push({
      id: ids[index],
      text: heading.text,
      level: heading.level,
    });
  });

  return headings;
}
