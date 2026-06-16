export interface Article {
  id: string;
  title: string;
  category: string;
  module: "架构殿堂" | "AI天空" | "技术茶馆";
  intro: string;
  content: string;
  coverImage?: string;
  sourceUrl?: string;
  date: string;
  readTime: string;
}

export type ModuleName = "架构殿堂" | "AI天空" | "技术茶馆";
