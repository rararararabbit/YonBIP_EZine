import type { Article, Issue, ModuleName } from "../types";

export type EcoModuleId = "all" | "architecture" | "ai_sky" | "teahouse";

export interface EcoMagazineMeta {
  brandName: string;
  volNumber: string;
  themeTitle: string;
  themeSubtitle: string;
  publishMonth: string;
  editorialQuote: string;
  coverImage: string;
  editor: string;
}

export interface EcoArticleView {
  id: string;
  title: string;
  excerpt: string;
  moduleId: Exclude<EcoModuleId, "all">;
  moduleName: ModuleName;
  columnTag: string;
  coverImage: string;
  date: string;
  readTime: string;
  sourceUrl?: string;
  htmlContent: string;
  featured?: boolean;
}

const MODULE_TO_ID: Record<ModuleName, Exclude<EcoModuleId, "all">> = {
  架构殿堂: "architecture",
  AI天空: "ai_sky",
  技术茶馆: "teahouse",
};

export function moduleNameToId(module: ModuleName): Exclude<EcoModuleId, "all"> {
  return MODULE_TO_ID[module];
}

export function toEcoArticle(article: Article, featured = false): EcoArticleView {
  return {
    id: article.id,
    title: article.title,
    excerpt: article.intro,
    moduleId: moduleNameToId(article.module),
    moduleName: article.module,
    columnTag: article.category,
    coverImage: article.coverImage || "",
    date: article.date,
    readTime: article.readTime,
    sourceUrl: article.sourceUrl,
    htmlContent: article.content || "",
    featured,
  };
}

export function buildEcoMeta(issue: Issue): EcoMagazineMeta {
  const extras = issue.ecoMeta;
  return {
    brandName: extras?.brandName || "BIP 技术与架构",
    volNumber: extras?.volNumber || "七月刊",
    themeTitle: extras?.themeTitle || issue.title.replace(/^BIP 技术与架构\s*[（(]?/, "").replace(/[）)]$/, "") || issue.label,
    themeSubtitle: extras?.themeSubtitle || issue.subtitle,
    publishMonth: extras?.publishMonth || `2026年${issue.label}`,
    editorialQuote: (extras?.editorialQuote || issue.tagline).replace(/^“|”$/g, ""),
    coverImage:
      extras?.coverImage ||
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    editor: issue.editor,
  };
}

export const COLUMN_TAG_PRESETS = [
  { id: "all", name: "全部栏目" },
  { id: "规范园地", name: "规范园地" },
  { id: "数据基石", name: "数据基石" },
  { id: "安全哨所", name: "安全哨所" },
  { id: "研发罗盘", name: "研发罗盘" },
  { id: "设计之家", name: "设计之家" },
  { id: "运维港湾", name: "运维港湾" },
  { id: "本体解码", name: "本体解码" },
  { id: "Skill兵器谱", name: "Skill兵器谱" },
  { id: "前沿动态", name: "前沿动态" },
  { id: "架构师访谈", name: "架构师访谈" },
  { id: "品茗论道", name: "品茗论道" },
  { id: "创新脉动", name: "创新脉动" },
];
