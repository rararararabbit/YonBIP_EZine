export interface Article {
  id: string;
  title: string;
  category: string;
  module: "架构殿堂" | "AI天空" | "技术茶馆";
  intro: string;
  content: string;
  coverImage?: string;
  sourceUrl?: string;
  videoUrl?: string;
  date: string;
  readTime: string;
}

export type ModuleName = "架构殿堂" | "AI天空" | "技术茶馆";

export interface Issue {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  editor: string;
  tagline: string;
  articles: Article[];
  /** Visual theme: classic lobster (vol-06) vs ecosystem magazine (vol-07+) */
  theme?: "classic" | "ecosystem";
  ecoMeta?: {
    brandName?: string;
    volNumber?: string;
    themeTitle?: string;
    themeSubtitle?: string;
    publishMonth?: string;
    editorialQuote?: string;
    coverImage?: string;
  };
}

export interface PastIssueLink {
  title: string;
  desc: string;
  url: string;
  tag?: string;
  /** Same SPA archive (e.g. ?issue=vol-06); open without target=_blank */
  sameApp?: boolean;
}
